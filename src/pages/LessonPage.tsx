import { useParams, useLocation } from "wouter";
import { useAuth } from "@clerk/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { speakKorean } from "../lib/koreanTTS";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

// ─── Types ───────────────────────────────────────────────────────────────────

type Formality = "casual" | "polite" | "formal";
type ScoreColour = "red" | "yellow" | "green" | "blue" | "purple";

interface KTSentence {
  ko: string;
  en_context: string;
  formality: Formality;
  context: string;
  group_title?: string;
}

interface KimchiPortion {
  title: string;
  insight: string;
}

interface Lesson {
  id: number;
  title: string;
  category: string;
  sub: string;
  theme: string;
  rule: string;
  sentences: KTSentence[];
  kimchi_portion: KimchiPortion;
}

interface SentenceProgress {
  unlocked: boolean;
  attempts: number;
  bestScore: number;
  lastScore: number | null;
  lastColour: ScoreColour | null;
  lastHeard: string | null;
  troubleSyllables: string[];
  breakEndsAt: number | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FORMALITY_TEXT: Record<Formality, string> = {
  casual: "#c9a86c",
  polite: "#6daa7c",
  formal: "#7094cc",
};
const FORMALITY_COLOURS: Record<Formality, string> = {
  casual: "rgba(201,168,108,0.18)",
  polite: "rgba(45,74,50,0.35)",
  formal: "rgba(42,62,100,0.35)",
};
const FORMALITY_BORDER: Record<Formality, string> = {
  casual: "rgba(201,168,108,0.45)",
  polite: "rgba(65,110,75,0.5)",
  formal: "rgba(80,110,170,0.45)",
};
const FORMALITY_LABELS: Record<Formality, string> = {
  casual: "Casual",
  polite: "Polite",
  formal: "Formal",
};

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

const SCORE_LABEL: Record<ScoreColour, string> = {
  red: "Keep going — you'll get it!",
  yellow: "Getting there. Listen and try again.",
  green: "Good! Sentence unlocked.",
  blue: "Excellent!",
  purple: "Native-level!",
};

// English sound examples for Korean syllables (no romanization)
const SYLLABLE_SOUNDS: Record<string, string> = {
  "안": '"on" (like "on it")',
  "녕": '"n-young" (like "young" with N)',
  "하": '"ha!" (like a laugh)',
  "세": '"say" (without the Y)',
  "요": '"yo" (like "yoga")',
  "고": '"go"',
  "마": '"ma" (like "mama")',
  "워": '"wuh" (like "wonder")',
  "감": '"gum"',
  "사": '"sa" (like "saga")',
  "합": '"hap" (like "happy")',
  "니": '"knee"',
  "다": '"da" (like "da da")',
  "저": '"juh" (like "just")',
  "는": '"nun" (the word)',
  "이": '"ee" (like "eel")',
  "름": '"rum" (the drink)',
  "실": '"shil" (like "shield")',
  "레": '"reh" (like "red")',
  "죄": '"jweh" (like "jway")',
  "송": '"song"',
  "습": '"ship" (soft ending)',
  "미": '"me"',
  "괜": '"gwen"',
  "찮": '"chan" (like "change")',
  "아": '"ah"',
  "오": '"oh"',
  "우": '"oo" (like "ooze")',
  "여": '"yuh" (like "yum")',
  "자": '"ja" (like "jar")',
  "만": '"man"',
  "나": '"na" (like "nah")',
  "도": '"dough" (the bread)',
  "어": '"uh" (like "ugh")',
  "서": '"suh" (like "sun")',
  "가": '"ga" (like "garden")',
  "반": '"ban" (like "banana")',
  "갑": '"gap"',
  "수": '"sue"',
  "싶": '"ship" (soft ending)',
  "태": '"tay" (like "tail")',
  "케": '"kay" (the letter K)',
  "지": '"gee" (like "geese")',
  "내": '"nay"',
  "일": '"eel"',
};

function syllableHint(syllable: string): string {
  return SYLLABLE_SOUNDS[syllable] ?? `"${syllable}" — listen carefully to the audio`;
}

let globalDict: Record<string, string> = {};
let dictLoaded = false;

async function loadDictionary(): Promise<Record<string, string>> {
  if (dictLoaded) return globalDict;
  try {
    const base = import.meta.env.BASE_URL ?? "/";
    const r = await fetch(`${base}korean_dictionary.json`);
    if (r.ok) globalDict = await r.json();
  } catch { /* dictionary fetch failed */ }
  dictLoaded = true;
  return globalDict;
}

const GRAMMAR_PATTERNS: Array<{ suffix: string; label: string }> = [
  { suffix: "습니다", label: "formal ending" },
  { suffix: "습니까", label: "formal question ending" },
  { suffix: "세요", label: "polite request ending" },
  { suffix: "까요", label: "question ending" },
  { suffix: "아요", label: "polite ending" },
  { suffix: "어요", label: "polite ending" },
  { suffix: "해요", label: "polite ending" },
  { suffix: "에서는", label: "at / in (topic)" },
  { suffix: "에서", label: "location marker" },
  { suffix: "보다", label: "than (comparison)" },
  { suffix: "는", label: "topic marker" },
  { suffix: "은", label: "topic marker" },
  { suffix: "이", label: "subject marker" },
  { suffix: "가", label: "subject marker" },
  { suffix: "을", label: "object marker" },
  { suffix: "를", label: "object marker" },
  { suffix: "에", label: "location marker" },
  { suffix: "도", label: "also / too" },
  { suffix: "만", label: "only" },
  { suffix: "요", label: "polite ending" },
];

function inferWordMeaning(word: string): string {
  for (const p of GRAMMAR_PATTERNS) {
    if (word.length > p.suffix.length && word.endsWith(p.suffix)) {
      const stem = word.slice(0, -p.suffix.length);
      if (globalDict[stem]) {
        return `${globalDict[stem]} + ${p.label}`;
      }
    }
  }
  if (word.endsWith("다")) return "verb/adjective stem";
  if (word.endsWith("요")) return "polite ending";
  if (word.endsWith("까")) return "question ending";
  return "Korean word";
}


function extractLessonWords(sentences: KTSentence[]): Array<{ ko: string; en: string }> {
  const seen = new Set<string>();
  const result: Array<{ ko: string; en: string }> = [];

  for (const s of sentences) {
    const words = stripPunc(s.ko).split(/\s+/).filter(Boolean);
    for (const w of words) {
      if (seen.has(w)) continue;
      seen.add(w);

      const dictMeaning = globalDict[w];
      if (dictMeaning) {
        result.push({ ko: w, en: dictMeaning });
      } else {
        result.push({ ko: w, en: inferWordMeaning(w) });
      }
    }
  }

  return result;
}

// ─── Speech evaluation ────────────────────────────────────────────────────────

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

function evaluateLocally(ko_expected: string, ko_heard: string): {
  score: number;
  colour: ScoreColour;
  trouble: string[];
} {
  const expWords = toWords(ko_expected);
  const heardWords = toWords(ko_heard);

  if (expWords.length === 0) return { score: 0, colour: "red", trouble: [] };
  if (expWords.join("") === heardWords.join("")) return { score: 100, colour: "purple", trouble: [] };

  const trouble: string[] = [];
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

    if (bestSim < 0.6) {
      for (const ch of ew) trouble.push(ch);
    }
  }

  const extraPenalty = Math.max(0, heardWords.length - expWords.length) * 3;
  const raw = (totalSim / expWords.length) * 100 - extraPenalty;
  const score = Math.min(100, Math.max(0, Math.round(raw)));
  return { score, colour: scoreColour(score), trouble: [...new Set(trouble)] };
}

// ─── Progress reducer ─────────────────────────────────────────────────────────

type ProgressAction =
  | {
      type: "EVALUATE";
      idx: number;
      score: number;
      colour: ScoreColour;
      heard: string;
      trouble: string[];
    }
  | { type: "RESET"; idx: number }
  | { type: "START_BREAK"; idx: number; endsAt: number }
  | { type: "END_BREAK"; idx: number };

function progressReducer(
  state: SentenceProgress[],
  action: ProgressAction,
): SentenceProgress[] {
  const next = state.map((p) => ({ ...p }));

  if (action.type === "EVALUATE") {
    const p = next[action.idx];
    p.attempts += 1;
    p.lastScore = action.score;
    p.lastColour = action.colour;
    p.lastHeard = action.heard;
    p.troubleSyllables = action.trouble;
    if (action.score > p.bestScore) p.bestScore = action.score;

    // Unlock next sentence if passed
    if (action.score >= 60 && action.idx + 1 < next.length) {
      next[action.idx + 1].unlocked = true;
    }

    // Force break: attempt 6, and every 4 after that if still no pass
    const shouldBreak =
      p.bestScore < 60 &&
      (p.attempts === 6 || (p.attempts > 6 && (p.attempts - 6) % 4 === 0));

    if (shouldBreak) {
      p.breakEndsAt = Date.now() + 2 * 60 * 1000;
    }
  }

  if (action.type === "RESET") {
    const p = next[action.idx];
    p.lastScore = null;
    p.lastColour = null;
    p.lastHeard = null;
    p.troubleSyllables = [];
  }

  if (action.type === "START_BREAK") {
    next[action.idx].breakEndsAt = action.endsAt;
  }

  if (action.type === "END_BREAK") {
    next[action.idx].breakEndsAt = null;
  }

  return next;
}

function initProgress(count: number): SentenceProgress[] {
  return Array.from({ length: count }, (_, i) => ({
    unlocked: i === 0,
    attempts: 0,
    bestScore: 0,
    lastScore: null,
    lastColour: null,
    lastHeard: null,
    troubleSyllables: [],
    breakEndsAt: null,
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AccuracyBar({ score, colour }: { score: number; colour: ScoreColour }) {
  return (
    <div className="kt-accuracy-bar-wrap">
      <div className="kt-accuracy-bar-track">
        <div
          className="kt-accuracy-bar-fill"
          style={{ width: `${score}%`, background: COLOUR_HEX[colour] }}
        />
        {/* Threshold markers */}
        <div className="kt-accuracy-marker" style={{ left: "60%" }} title="Green threshold" />
      </div>
      <div className="kt-accuracy-score" style={{ color: COLOUR_HEX[colour] }}>
        {score}
        <span className="kt-accuracy-pct">%</span>
      </div>
    </div>
  );
}

function RewardAnimation({ colour }: { colour: ScoreColour }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="kt-reward-anim" aria-hidden>
      {REWARD_EMOJI[colour]}
    </div>
  );
}

function SpeechBubbleHelp({
  syllable,
  attempts,
}: {
  syllable: string;
  attempts: number;
}) {
  if (attempts < 4 || !syllable) return null;

  return (
    <div className="kt-speech-bubble">
      <div className="kt-speech-bubble-tail" />
      <p className="kt-speech-bubble-text">
        The syllable <span className="kt-speech-bubble-ko">{syllable}</span> sounds like{" "}
        <span className="kt-speech-bubble-hint">{syllableHint(syllable)}</span>
      </p>
    </div>
  );
}

function BreakTimer({
  endsAt,
  onDone,
}: {
  endsAt: number;
  onDone: () => void;
}) {
  const [remaining, setRemaining] = useState(Math.max(0, endsAt - Date.now()));

  useEffect(() => {
    if (remaining <= 0) {
      onDone();
      return;
    }
    const t = setInterval(() => {
      const r = Math.max(0, endsAt - Date.now());
      setRemaining(r);
      if (r === 0) {
        clearInterval(t);
        onDone();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [endsAt, onDone, remaining]);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  return (
    <div className="kt-break-timer">
      <div className="kt-break-icon">⏸</div>
      <p className="kt-break-message">
        It takes time. Take a 2-minute break and come back refreshed.
      </p>
      <div className="kt-break-countdown">
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
    </div>
  );
}

function WordCard({ word }: { word: { ko: string; en: string } }) {
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speak = useCallback(() => {
    void speakKorean(word.ko, {
      rate: 0.75,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  }, [word.ko]);

  const startRecord = useCallback(() => {
    const SR =
      (window as Window & { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ??
      (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition })
        .webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition needs Chrome or Edge browser."); return; }
    if (recording) { recognitionRef.current?.stop(); return; }

    setScore(null);
    setFeedback(null);
    setRecording(true);

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = "ko-KR";
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      const heard = event.results[0][0].transcript;
      const { score: pct } = evaluateLocally(word.ko, heard);
      setScore(pct);
      setFeedback(pct >= 60 ? "Great! You're getting the sound." : "Listen again and try to match the sound.");
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
  }, [recording, word.ko]);

  const scoreColor = score !== null
    ? score >= 80 ? "#6daa7c" : score >= 60 ? "#c9a86c" : "#cc4444"
    : undefined;

  return (
    <div className="kt-word-card">
      <div className="kt-word-card-ko">{word.ko}</div>
      <div className="kt-word-card-en">{word.en}</div>
      <div className="kt-word-card-controls">
        <button className={`kt-audio-btn kt-audio-btn--listen ${playing ? "kt-audio-btn--active" : ""}`} onClick={speak}>
          {playing ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z" /></svg>
          )}
          {playing ? "Playing…" : "Listen"}
        </button>
        <button className={`kt-audio-btn kt-audio-btn--record ${recording ? "kt-audio-btn--recording" : ""}`} onClick={startRecord}>
          {recording ? (
            <><span className="kt-rec-dot" />Stop</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-1 18.93V22h2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" /></svg>Repeat</>
          )}
        </button>
      </div>
      {score !== null && (
        <div className="kt-word-card-feedback">
          <span className="kt-word-card-score" style={{ color: scoreColor }}>{score}%</span>
          <span className="kt-word-card-hint">{feedback}</span>
        </div>
      )}
    </div>
  );
}

function WordsForLesson({ sentences }: { sentences: KTSentence[] }) {
  const [words, setWords] = useState<Array<{ ko: string; en: string }>>([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    loadDictionary().then(() => {
      setWords(extractLessonWords(sentences));
    });
  }, [sentences]);

  if (words.length === 0) return null;

  return (
    <div className="kt-words-section">
      <button className="kt-words-section-header" onClick={() => setExpanded(!expanded)}>
        <span className="kt-words-section-icon">📖</span>
        <span className="kt-words-section-title">Words for This Lesson</span>
        <span className="kt-words-section-count">{words.length} words</span>
        <span className={`kt-words-section-arrow ${expanded ? "kt-words-section-arrow--open" : ""}`}>▸</span>
      </button>
      <p className="kt-words-section-note">
        Familiarise yourself with the sounds before full sentences. This section is pure practice — no scores are tracked.
      </p>
      {expanded && (
        <div className="kt-words-grid">
          {words.map((w, i) => (
            <WordCard key={i} word={w} />
          ))}
        </div>
      )}
    </div>
  );
}

function LockedSentenceOverlay() {
  return (
    <div className="kt-locked-overlay">
      <div className="kt-locked-icon">🔒</div>
      <p className="kt-locked-text">Pass the sentence above to unlock</p>
    </div>
  );
}

// ─── Sentence Card ────────────────────────────────────────────────────────────

interface SentenceCardProps {
  s: KTSentence;
  n: number;
  progress: SentenceProgress;
  lessonId: number;
  onEvaluate: (score: number, colour: ScoreColour, heard: string, trouble: string[]) => void;
  onReset: () => void;
  onBreakEnd: () => void;
}

function SentenceCard({ s, n, progress, onEvaluate, onReset, onBreakEnd }: SentenceCardProps) {
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [showReward, setShowReward] = useState<ScoreColour | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { unlocked, attempts, lastScore, lastColour, lastHeard, troubleSyllables, breakEndsAt } =
    progress;
  const onBreak = breakEndsAt !== null && Date.now() < breakEndsAt;
  const showHelp = attempts >= 4 && !onBreak && troubleSyllables.length > 0;

  const speak = useCallback(() => {
    void speakKorean(s.ko, {
      rate: 0.82,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  }, [s.ko]);

  const startRecord = useCallback(() => {
    const SR =
      (window as Window & { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ??
      (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition })
        .webkitSpeechRecognition;

    if (!SR) {
      alert("Speech recognition needs Chrome or Edge browser.");
      return;
    }

    if (recording) {
      recognitionRef.current?.stop();
      return;
    }

    onReset();
    setShowReward(null);
    setRecording(true);

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = "ko-KR";
    rec.interimResults = false;
    rec.maxAlternatives = 5;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      const heard = event.results[0][0].transcript;
      const { score, colour, trouble } = evaluateLocally(s.ko, heard);
      onEvaluate(score, colour, heard, trouble);
      setShowReward(colour);
    };

    rec.onerror = () => {
      setRecording(false);
    };

    rec.onend = () => {
      setRecording(false);
    };

    rec.start();
  }, [recording, s.ko, onEvaluate, onReset]);

  return (
    <div
      className={`kt-sentence-card ${!unlocked ? "kt-sentence-card--locked" : ""} ${
        lastColour ? `kt-sentence-card--${lastColour}` : ""
      }`}
    >
      <div className="kt-sentence-num">{String(n).padStart(2, "0")}</div>

      <div className="kt-sentence-body">
        <p className="kt-sentence-ko">{s.ko}</p>
        <p className="kt-sentence-en">{s.en_context}</p>

        {/* Audio controls */}
        <div className="kt-audio-controls">
          <button
            className={`kt-audio-btn kt-audio-btn--listen ${playing ? "kt-audio-btn--active" : ""}`}
            onClick={speak}
            disabled={!unlocked || onBreak}
          >
            {playing ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
            {playing ? "Playing…" : "Listen"}
          </button>

          <button
            className={`kt-audio-btn kt-audio-btn--record ${recording ? "kt-audio-btn--recording" : ""}`}
            onClick={startRecord}
            disabled={!unlocked || onBreak}
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
                Repeat
              </>
            )}
          </button>
        </div>

        {/* Break timer */}
        {onBreak && breakEndsAt && (
          <BreakTimer endsAt={breakEndsAt} onDone={onBreakEnd} />
        )}

        {/* Feedback */}
        {!onBreak && lastScore !== null && lastColour && (
          <div className="kt-feedback-block">
            <AccuracyBar score={lastScore} colour={lastColour} />

            <div className="kt-feedback-heard">
              <span className="kt-feedback-heard-label">You said:</span>
              <span className="kt-feedback-heard-text">{lastHeard}</span>
            </div>

            <div className="kt-feedback-label" style={{ color: COLOUR_HEX[lastColour] }}>
              {SCORE_LABEL[lastColour]}
            </div>

            {/* Speech bubble help from attempt 4 */}
            {showHelp && (
              <SpeechBubbleHelp
                syllable={troubleSyllables[0]}
                attempts={attempts}
              />
            )}
          </div>
        )}

        {/* Reward animation */}
        {showReward && <RewardAnimation colour={showReward} />}
      </div>

      <div
        className="kt-sentence-formality"
        style={{
          background: FORMALITY_COLOURS[s.formality],
          border: `1px solid ${FORMALITY_BORDER[s.formality]}`,
          color: FORMALITY_TEXT[s.formality],
        }}
      >
        {FORMALITY_LABELS[s.formality]}
      </div>

      {/* Locked overlay */}
      {!unlocked && <LockedSentenceOverlay />}
    </div>
  );
}

// ─── Group helper ─────────────────────────────────────────────────────────────

function groupSentences(
  sentences: KTSentence[],
): Array<{ title?: string; items: KTSentence[]; startIdx: number }> {
  const groups: Array<{ title?: string; items: KTSentence[]; startIdx: number }> = [];
  let current: (typeof groups)[0] | null = null;
  let idx = 0;

  for (const s of sentences) {
    if (s.group_title) {
      current = { title: s.group_title, items: [s], startIdx: idx };
      groups.push(current);
    } else if (current) {
      current.items.push(s);
    } else {
      current = { items: [s], startIdx: idx };
      groups.push(current);
    }
    idx++;
  }
  return groups;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [, setLocation] = useLocation();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lessonId = parseInt(id ?? "0", 10);
  const isFree = lessonId === 1;

  // Load lesson
  useEffect(() => {
    if (!isLoaded) return;
    if (!isFree && !isSignedIn) {
      setLocation("/sign-up");
      return;
    }

    const load = async () => {
      const headers: Record<string, string> = {};
      if (!isFree) {
        const token = await getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
      }
      const r = await fetch(`${API_BASE}/lessons/${lessonId}`, { headers });
      if (r.status === 401) { setLocation("/sign-in"); return; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setLesson(await r.json() as Lesson);
    };

    load().catch((e) => setError(String(e))).finally(() => setLoading(false));
  }, [isLoaded, isSignedIn, lessonId, isFree, setLocation, getToken]);

  // ─── Persistent progress via localStorage ────────────────────────────────
  const storageKey = `kt_lesson_${lessonId}`;

  const [progressArr, setProgressArr] = useState<SentenceProgress[]>([]);

  // Load saved progress (or fresh init) when lesson loads
  useEffect(() => {
    if (!lesson) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: SentenceProgress[] = JSON.parse(saved);
        // If saved length matches current lesson, restore it
        if (parsed.length === lesson.sentences.length) {
          setProgressArr(parsed);
          return;
        }
      }
    } catch { /* ignore corrupt data */ }
    setProgressArr(initProgress(lesson.sentences.length));
  }, [lesson, storageKey]);

  // Persist every time progress changes
  useEffect(() => {
    if (progressArr.length > 0) {
      try { localStorage.setItem(storageKey, JSON.stringify(progressArr)); } catch { /* quota */ }
    }
  }, [progressArr, storageKey]);

  // Mark lesson as completed in a global set when all sentences pass
  useEffect(() => {
    const allDone = progressArr.length > 0 && progressArr.every((p) => p.bestScore >= 60);
    if (allDone) {
      try {
        const raw = localStorage.getItem("kt_completed_lessons");
        const set: number[] = raw ? JSON.parse(raw) : [];
        if (!set.includes(lessonId)) {
          localStorage.setItem("kt_completed_lessons", JSON.stringify([...set, lessonId]));
        }
      } catch { /* ignore */ }
    }
  }, [progressArr, lessonId]);

  const handleEvaluate = useCallback(
    (sentenceIdx: number, score: number, colour: ScoreColour, heard: string, trouble: string[]) => {
      setProgressArr((prev) => {
        const next = prev.map((p) => ({ ...p }));
        const p = next[sentenceIdx];
        p.attempts += 1;
        p.lastScore = score;
        p.lastColour = colour;
        p.lastHeard = heard;
        p.troubleSyllables = trouble;
        if (score > p.bestScore) p.bestScore = score;

        if (score >= 60 && sentenceIdx + 1 < next.length) {
          next[sentenceIdx + 1].unlocked = true;
        }

        const shouldBreak =
          p.bestScore < 60 &&
          (p.attempts === 6 || (p.attempts > 6 && (p.attempts - 6) % 4 === 0));

        if (shouldBreak) {
          p.breakEndsAt = Date.now() + 2 * 60 * 1000;
        }
        return next;
      });
    },
    [],
  );

  const handleReset = useCallback((sentenceIdx: number) => {
    setProgressArr((prev) => {
      const next = prev.map((p) => ({ ...p }));
      next[sentenceIdx].lastScore = null;
      next[sentenceIdx].lastColour = null;
      next[sentenceIdx].lastHeard = null;
      next[sentenceIdx].troubleSyllables = [];
      return next;
    });
  }, []);

  const handleBreakEnd = useCallback((sentenceIdx: number) => {
    setProgressArr((prev) => {
      const next = prev.map((p) => ({ ...p }));
      next[sentenceIdx].breakEndsAt = null;
      return next;
    });
  }, []);

  const allPassed =
    progressArr.length > 0 && progressArr.every((p) => p.bestScore >= 60);

  // ─── Render states ─────────────────────────────────────────────────────────

  if (!isLoaded || loading) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading">Loading lesson…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading" style={{ color: "var(--kt-gold)" }}>
          Could not load lesson.{" "}
          <button className="kt-nav-link" onClick={() => setLocation("/lessons")}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  const groups = groupSentences(lesson.sentences);
  let sentenceCounter = 0;

  return (
    <div className="kt-lesson-view">
      <div className="grain-overlay" aria-hidden />

      {/* Nav */}
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
        <div className="kt-nav-icons">
          <button className="kt-nav-link" onClick={() => setLocation("/lessons")}>
            ← All Lessons
          </button>
        </div>
      </nav>

      <div className="kt-lesson-outer">

        {/* Header */}
        <div className="kt-lesson-header-block">
          <div className="kt-lesson-meta-row">
            <span className="kt-lesson-category-tag">{lesson.category}</span>
            {isFree && <span className="kt-lesson-badge kt-lesson-badge--free">Free Lesson</span>}
            <span className="kt-lesson-sub-tag">Sub-lesson ({lesson.sub})</span>
          </div>

          <h1 className="kt-lesson-main-title">{lesson.title}</h1>

          <div className="kt-lesson-rule-row">
            <span className="kt-lesson-rule-label">Theme</span>
            <span className="kt-lesson-rule-text">{lesson.theme}</span>
          </div>
          {lesson.rule && (
            <div className="kt-lesson-rule-row">
              <span className="kt-lesson-rule-label">Rule</span>
              <span className="kt-lesson-rule-text">{lesson.rule}</span>
            </div>
          )}

          {/* Method note */}
          <div className="kt-audio-method-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            <span>
              Listen to each sentence, then tap Repeat to say it back. Score 60% or above to unlock
              the next sentence. Score bands: <span style={{ color: "#cc4444" }}>red</span>{" "}
              <span style={{ color: "#c9a86c" }}>yellow</span>{" "}
              <span style={{ color: "#6daa7c" }}>green</span>{" "}
              <span style={{ color: "#7094cc" }}>blue</span>{" "}
              <span style={{ color: "#b07acc" }}>purple</span>
            </span>
          </div>

          {/* Formality key */}
          <div className="kt-formality-key">
            {(["casual", "polite", "formal"] as Formality[]).map((f) => (
              <div
                key={f}
                className="kt-formality-key-item"
                style={{ color: FORMALITY_TEXT[f], borderColor: FORMALITY_BORDER[f] }}
              >
                {FORMALITY_LABELS[f]}
              </div>
            ))}
          </div>
        </div>

        {/* Words for this lesson */}
        <WordsForLesson sentences={lesson.sentences} />

        {/* Sentence Stacking */}
        <div className="kt-sentence-groups">
          {groups.map((group, gi) => {
            const groupStartIdx = group.startIdx;
            return (
              <div key={gi} className="kt-sentence-group">
                {group.title && (
                  <div className="kt-sentence-group-title">
                    <span className="kt-sentence-group-title-text">{group.title}</span>
                  </div>
                )}
                <div className="kt-sentence-list">
                  {group.items.map((s, localIdx) => {
                    sentenceCounter++;
                    const idx = groupStartIdx + localIdx;
                    const prog = progressArr[idx] ?? {
                      unlocked: idx === 0,
                      attempts: 0,
                      bestScore: 0,
                      lastScore: null,
                      lastColour: null,
                      lastHeard: null,
                      troubleSyllables: [],
                      breakEndsAt: null,
                    };
                    return (
                      <SentenceCard
                        key={idx}
                        s={s}
                        n={sentenceCounter}
                        progress={prog}
                        lessonId={lessonId}
                        onEvaluate={(score, colour, heard, trouble) =>
                          handleEvaluate(idx, score, colour, heard, trouble)
                        }
                        onReset={() => handleReset(idx)}
                        onBreakEnd={() => handleBreakEnd(idx)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Kimchi Portion */}
        {lesson.kimchi_portion && (
          <div className="kt-kimchi-portion">
            <div className="kt-kimchi-header">
              <span className="kt-kimchi-icon">🌶</span>
              <span className="kt-kimchi-title">{lesson.kimchi_portion.title}</span>
            </div>
            <p className="kt-kimchi-insight">{lesson.kimchi_portion.insight}</p>
          </div>
        )}

        {/* Quiz unlock */}
        {allPassed && (
          <div className="kt-quiz-unlock">
            <div className="kt-quiz-unlock-badge">🎉</div>
            <h3 className="kt-quiz-unlock-title">All sentences passed!</h3>
            <p className="kt-quiz-unlock-sub">
              You scored green or above on every sentence. Take the quiz to lock in your progress
              and unlock lesson {lessonId + 1}.
            </p>
            <button
              className="kt-btn-primary"
              onClick={() => setLocation(`/lessons/${lessonId}/match`)}
            >
              Match the Audio → Quiz
            </button>
          </div>
        )}

        {/* Free lesson CTA */}
        {isFree && !isSignedIn && (
          <div className="kt-lessons-upsell">
            <p className="kt-lessons-upsell-text">
              ✦ &nbsp;You have completed your test drive. Ready for lesson 2?
            </p>
            <a href={`${basePath}/sign-up`} className="kt-btn-primary">
              Create Free Account — Unlock All 80 Lessons
            </a>
          </div>
        )}

        {/* Navigation */}
        <div className="kt-lesson-nav-row">
          <button
            className="kt-btn-ghost"
            onClick={() => setLocation("/lessons")}
            style={{ fontSize: "0.8rem" }}
          >
            ← All Lessons
          </button>
          {isSignedIn && lessonId < 89 && (
            <button
              className="kt-btn-primary"
              style={{ fontSize: "0.8rem" }}
              onClick={() => setLocation(`/lessons/${lessonId + 1}`)}
            >
              Next Lesson →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
