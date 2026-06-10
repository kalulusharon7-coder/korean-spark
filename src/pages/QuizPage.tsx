/**
 * KT Vault — Quiz Page
 *
 * /lessons/:id/quiz
 *
 * Lesson 1:  10 questions from lesson 1
 * Lesson 2+: 12 questions — 10 current + 2 random from previous lessons
 *
 * Rules: Must score GREEN (>=60) on each question to pass.
 * Must pass all questions to unlock the next lesson.
 */

import { useParams, useLocation } from "wouter";
import { useAuth } from "@clerk/react";
import { useEffect, useState, useCallback, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

type ScoreColour = "red" | "yellow" | "green" | "blue" | "purple";

interface QuizQuestion {
  id: string;
  ko: string;
  en_context: string;
  formality: string;
  type: "current_lesson" | "previous_lesson";
}

interface QuizData {
  lessonId: number;
  totalQuestions: number;
  passThreshold: number;
  questions: QuizQuestion[];
}

interface QuizResult {
  questionId: string;
  score: number;
  colour: ScoreColour;
  heard: string;
  passed: boolean;
}

const COLOUR_HEX: Record<ScoreColour, string> = {
  red: "#cc4444",
  yellow: "#c9a86c",
  green: "#6daa7c",
  blue: "#7094cc",
  purple: "#b07acc",
};

const REWARD_EMOJI: Record<ScoreColour, string> = {
  red: "❤️",
  yellow: "💪",
  green: "👍",
  blue: "🎉",
  purple: "🎆",
};

function stripPunc(s: string): string {
  return s.replace(/[.,!?。、·]/g, "").trim();
}

function toWords(s: string): string[] {
  return stripPunc(s).split(/\s+/).filter(Boolean);
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function wordSim(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  return Math.max(0, 1 - levenshtein(a, b) / Math.max(a.length, b.length));
}

function scoreColour(score: number): ScoreColour {
  if (score >= 95) return "purple";
  if (score >= 80) return "blue";
  if (score >= 60) return "green";
  if (score >= 40) return "yellow";
  return "red";
}

function evaluate(expected: string, heard: string): { score: number; colour: ScoreColour } {
  const expWords = toWords(expected);
  const heardWords = toWords(heard);
  if (expWords.length === 0) return { score: 0, colour: "red" };
  if (expWords.join("") === heardWords.join("")) return { score: 100, colour: "purple" };

  let totalSim = 0;
  const used = new Set<number>();
  for (const ew of expWords) {
    let bestSim = 0;
    let bestIdx = -1;
    for (let j = 0; j < heardWords.length; j++) {
      if (used.has(j)) continue;
      const sim = wordSim(ew, heardWords[j]);
      if (sim > bestSim) { bestSim = sim; bestIdx = j; }
    }
    if (bestIdx >= 0) used.add(bestIdx);
    totalSim += bestSim;
  }

  const extraPenalty = Math.max(0, heardWords.length - expWords.length) * 3;
  const raw = (totalSim / expWords.length) * 100 - extraPenalty;
  const score = Math.min(100, Math.max(0, Math.round(raw)));
  return { score, colour: scoreColour(score) };
}

function AccuracyBar({ score, colour }: { score: number; colour: ScoreColour }) {
  return (
    <div className="kt-accuracy-bar-wrap">
      <div className="kt-accuracy-bar-track">
        <div
          className="kt-accuracy-bar-fill"
          style={{ width: `${score}%`, background: COLOUR_HEX[colour] }}
        />
        <div className="kt-accuracy-marker" style={{ left: "60%" }} />
      </div>
      <div className="kt-accuracy-score" style={{ color: COLOUR_HEX[colour] }}>
        {score}<span className="kt-accuracy-pct">%</span>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [, setLocation] = useLocation();

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [phase, setPhase] = useState<"question" | "feedback" | "summary">("question");
  const [recording, setRecording] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const lessonId = parseInt(id ?? "0", 10);

  useEffect(() => {
    if (!isLoaded) return;
    // Lesson 1 is the free test-drive — its quiz is available without sign-in.
    const isFree = lessonId === 1;
    if (!isFree && !isSignedIn) {
      setLocation("/sign-in");
      return;
    }

    const load = async () => {
      const token = await getToken();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const r = await fetch(`${API_BASE}/quiz/generate/${lessonId}`, { headers });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setQuiz(await r.json() as QuizData);
    };

    load().catch((e) => setError(String(e))).finally(() => setLoading(false));
  }, [isLoaded, isSignedIn, lessonId, setLocation, getToken]);

  const currentQuestion = quiz?.questions[currentIdx];

  const startRecord = useCallback(() => {
    if (!currentQuestion) return;

    const SR =
      (window as Window & { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ??
      (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition })
        .webkitSpeechRecognition;

    if (!SR) {
      alert("Speech recognition needs Chrome or Edge.");
      return;
    }

    if (recording) {
      recognitionRef.current?.stop();
      return;
    }

    setRecording(true);
    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = "ko-KR";
    rec.interimResults = false;
    rec.maxAlternatives = 5;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      const heard = event.results[0][0].transcript;
      const { score, colour } = evaluate(currentQuestion.ko, heard);
      const result: QuizResult = {
        questionId: currentQuestion.id,
        score,
        colour,
        heard,
        passed: score >= 60,
      };
      setCurrentResult(result);
      setResults((prev) => [...prev, result]);
      setPhase("feedback");
    };

    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
  }, [currentQuestion, recording]);

  const nextQuestion = useCallback(() => {
    if (!quiz) return;
    setCurrentResult(null);
    if (currentIdx + 1 >= quiz.questions.length) {
      setPhase("summary");
    } else {
      setCurrentIdx((i) => i + 1);
      setPhase("question");
    }
  }, [currentIdx, quiz]);

  // Persist lesson completion to the server (per-account, cross-device) when the
  // user passes every quiz question.
  useEffect(() => {
    if (phase !== "summary" || !quiz || !isSignedIn) return;
    const passed =
      results.length === quiz.totalQuestions && results.every((r) => r.passed);
    if (!passed) return;
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const avg = Math.round(
          results.reduce((s, r) => s + r.score, 0) / (results.length || 1),
        );
        await fetch(`${API_BASE}/progress/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ lessonId, completed: true, score: avg }),
        });
      } catch {
        /* progress is best-effort; localStorage keeps a local copy */
      }
    })();
  }, [phase, quiz, results, isSignedIn, lessonId, getToken]);

  if (!isLoaded || loading) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading">Generating quiz…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading" style={{ color: "var(--kt-gold)" }}>
          Could not load quiz.{" "}
          <button className="kt-nav-link" onClick={() => setLocation(`/lessons/${lessonId}`)}>
            ← Back to Lesson
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const passedAll = results.length === quiz.totalQuestions && results.every((r) => r.passed);
  const totalPassed = results.filter((r) => r.passed).length;

  // Persist quiz completion to localStorage so lessons list and lesson page stay unlocked
  if (phase === "summary" && passedAll) {
    try {
      const raw = localStorage.getItem("kt_completed_lessons");
      const set: number[] = raw ? JSON.parse(raw) : [];
      if (!set.includes(lessonId)) {
        localStorage.setItem("kt_completed_lessons", JSON.stringify([...set, lessonId]));
      }
    } catch { /* ignore */ }
  }

  // ─── Summary screen ───────────────────────────────────────────────────────

  if (phase === "summary") {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <nav className="kt-nav">
          <div className="kt-nav-logo" style={{ cursor: "pointer" }} onClick={() => setLocation("/")}>
            <img src="/kt-logo.png" alt="KT Vault" />
            <div className="kt-nav-brand">
              <span className="kt-nav-brand-name">KT Vault</span>
              <span className="kt-nav-brand-sub">Kala-Tala Communication</span>
            </div>
          </div>
        </nav>

        <div className="kt-lesson-outer">
          <div className="kt-quiz-summary">
            <div className="kt-quiz-summary-emoji">
              {passedAll ? "🎆" : totalPassed >= quiz.totalQuestions * 0.7 ? "👍" : "💪"}
            </div>
            <h2 className="kt-quiz-summary-title">
              {passedAll ? "Quiz Complete!" : "Keep Practising"}
            </h2>
            <p className="kt-quiz-summary-score">
              {totalPassed} / {quiz.totalQuestions} passed
            </p>

            {passedAll ? (
              <>
                <p className="kt-quiz-summary-msg">
                  You scored GREEN or above on every question. Lesson {lessonId + 1} is now
                  unlocked.
                </p>
                <div className="kt-quiz-summary-actions">
                  <button
                    className="kt-btn-primary"
                    onClick={() => setLocation(`/lessons/${lessonId + 1}`)}
                  >
                    Start Lesson {lessonId + 1} →
                  </button>
                  <button
                    className="kt-btn-ghost"
                    onClick={() => setLocation(`/lessons/${lessonId}`)}
                  >
                    ← Back to Lesson
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="kt-quiz-summary-msg">
                  Go back to the lesson, practise the sentences you found difficult, then try the
                  quiz again.
                </p>
                <div className="kt-quiz-summary-actions">
                  <button
                    className="kt-btn-primary"
                    onClick={() => {
                      setCurrentIdx(0);
                      setResults([]);
                      setPhase("question");
                      setCurrentResult(null);
                    }}
                  >
                    Retry Quiz
                  </button>
                  <button
                    className="kt-btn-ghost"
                    onClick={() => setLocation(`/lessons/${lessonId}`)}
                  >
                    ← Back to Lesson
                  </button>
                </div>
              </>
            )}

            {/* Per-question breakdown */}
            <div className="kt-quiz-breakdown">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="kt-quiz-breakdown-row"
                  style={{ borderColor: COLOUR_HEX[r.colour] }}
                >
                  <span className="kt-quiz-breakdown-num">{i + 1}</span>
                  <span className="kt-quiz-breakdown-ko">{quiz.questions[i]?.ko}</span>
                  <span
                    className="kt-quiz-breakdown-score"
                    style={{ color: COLOUR_HEX[r.colour] }}
                  >
                    {r.score}% {REWARD_EMOJI[r.colour]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Question screen ──────────────────────────────────────────────────────

  if (!currentQuestion) return null;

  return (
    <div className="kt-lesson-view">
      <div className="grain-overlay" aria-hidden />

      <nav className="kt-nav">
        <div
          className="kt-nav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => setLocation("/")}
        >
          <img src="/kt-logo.png" alt="KT Vault" />
          <div className="kt-nav-brand">
            <span className="kt-nav-brand-name">KT Vault</span>
            <span className="kt-nav-brand-sub">Kala-Tala Communication</span>
          </div>
        </div>
        <button
          className="kt-nav-link"
          onClick={() => setLocation(`/lessons/${lessonId}`)}
        >
          ← Back to Lesson
        </button>
      </nav>

      <div className="kt-lesson-outer">
        {/* Quiz header */}
        <div className="kt-quiz-header">
          <span className="kt-quiz-label">QUIZ — Lesson {lessonId}</span>
          <span className="kt-quiz-progress">
            {currentIdx + 1} / {quiz.totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="kt-quiz-progress-bar-track">
          <div
            className="kt-quiz-progress-bar-fill"
            style={{ width: `${((currentIdx) / quiz.totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question type badge */}
        {currentQuestion.type === "previous_lesson" && (
          <div className="kt-quiz-prev-badge">Review — from an earlier lesson</div>
        )}

        {/* The sentence */}
        <div className="kt-quiz-card">
          <p className="kt-quiz-card-instruction">Say this sentence in Korean:</p>
          <p className="kt-quiz-card-en">{currentQuestion.en_context}</p>

          <div className="kt-audio-controls" style={{ marginTop: "1.5rem" }}>
            {phase === "question" && (
              <button
                className={`kt-audio-btn kt-audio-btn--record ${recording ? "kt-audio-btn--recording" : ""}`}
                onClick={startRecord}
              >
                {recording ? (
                  <>
                    <span className="kt-rec-dot" />
                    Stop
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-1 18.93V22h2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" />
                    </svg>
                    Say it
                  </>
                )}
              </button>
            )}
          </div>

          {/* Feedback */}
          {phase === "feedback" && currentResult && (
            <div className="kt-feedback-block" style={{ marginTop: "1.5rem" }}>
              <AccuracyBar score={currentResult.score} colour={currentResult.colour} />

              <div className="kt-feedback-heard">
                <span className="kt-feedback-heard-label">You said:</span>
                <span className="kt-feedback-heard-text">{currentResult.heard}</span>
              </div>

              {currentResult.passed ? (
                <p style={{ color: COLOUR_HEX[currentResult.colour], fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  {REWARD_EMOJI[currentResult.colour]} Passed!
                </p>
              ) : (
                <div>
                  <p style={{ color: COLOUR_HEX.red, fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    Score below 60% — you will need to retry the quiz.
                  </p>
                  <p style={{ color: "var(--kt-cream-muted)", fontSize: "0.72rem", marginTop: "0.3rem" }}>
                    The correct sentence was: <strong style={{ color: "var(--kt-cream)" }}>{currentQuestion.ko}</strong>
                  </p>
                </div>
              )}

              <button
                className="kt-btn-primary"
                style={{ marginTop: "1.25rem", fontSize: "0.8rem" }}
                onClick={nextQuestion}
              >
                {currentIdx + 1 < quiz.totalQuestions ? "Next Question →" : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
