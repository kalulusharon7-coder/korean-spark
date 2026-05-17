/**
 * KT Vault — Match the Audio
 *
 * /lessons/:id/match
 *
 * LEFT  (fixed):     10 English phrases, each with a drop zone.
 * RIGHT (draggable): 10 numbered audio buttons (no Korean text).
 *
 * Drag an audio button onto the correct English phrase.
 * Correct → audio plays + button locks into the slot.
 * Wrong   → nothing happens (zero feedback).
 * All matched → auto-navigate to quiz after 1.8 s.
 *
 * Also supports tap-to-select (mobile): tap an audio button to
 * select it (and hear it), then tap the English phrase to place it.
 */

import { useParams, useLocation } from "wouter";
import { useAuth } from "@clerk/react";
import { useEffect, useState, useRef } from "react";
import { speakKorean } from "../lib/koreanTTS";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

interface Sentence {
  ko: string;
  en_context: string;
  formality: string;
}

interface Lesson {
  id: number;
  title: string;
  category: string;
  sentences: Sentence[];
}

/** Shuffled audio button index list */
function shuffleIndices(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchAudioPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [, setLocation] = useLocation();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lessonId = parseInt(id ?? "0", 10);
  const isFree = lessonId === 1;

  // shuffledOrder[rightColPos] = sentenceIndex
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);

  // locked[phraseIdx] = sentenceIdx of the correctly placed audio button
  const [locked, setLocked] = useState<Map<number, number>>(new Map());

  // For tap-to-select: selected sentenceIdx from right column
  const [selectedAudio, setSelectedAudio] = useState<number | null>(null);

  // Drag state
  const draggedSentenceIdxRef = useRef<number | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const [complete, setComplete] = useState(false);

  // Load lesson
  useEffect(() => {
    if (!isLoaded) return;
    if (!isFree && !isSignedIn) {
      setLocation("/sign-in");
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
      const data = await r.json() as Lesson;
      setLesson(data);
      setShuffledOrder(shuffleIndices(data.sentences.length));
    };
    load().catch(e => setError(String(e))).finally(() => setLoading(false));
  }, [isLoaded, isSignedIn, lessonId, isFree, setLocation, getToken]);

  // Check completion
  useEffect(() => {
    if (!lesson) return undefined;
    if (locked.size === lesson.sentences.length && lesson.sentences.length > 0) {
      setComplete(true);
      const t = setTimeout(() => setLocation(`/lessons/${lessonId}/quiz`), 1800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [locked, lesson, lessonId, setLocation]);

  // Attempt to match audio sentenceIdx onto English phraseIdx
  function attemptMatch(phraseIdx: number, sentenceIdx: number) {
    if (!lesson) return;
    if (locked.has(phraseIdx)) return; // slot already filled

    if (sentenceIdx === phraseIdx) {
      // Correct!
      speakKorean(lesson.sentences[sentenceIdx].ko);
      setLocked(prev => new Map(prev).set(phraseIdx, sentenceIdx));
      setSelectedAudio(null);
    }
    // Wrong → do nothing (spec requirement)
  }

  // ── Drag handlers ─────────────────────────────────────────────────────────
  function onAudioDragStart(sentenceIdx: number) {
    draggedSentenceIdxRef.current = sentenceIdx;
    setSelectedAudio(null);
  }

  function onAudioDragEnd() {
    draggedSentenceIdxRef.current = null;
    setDragOverSlot(null);
  }

  function onSlotDragOver(e: React.DragEvent, phraseIdx: number) {
    e.preventDefault();
    if (!locked.has(phraseIdx)) setDragOverSlot(phraseIdx);
  }

  function onSlotDragLeave() {
    setDragOverSlot(null);
  }

  function onSlotDrop(e: React.DragEvent, phraseIdx: number) {
    e.preventDefault();
    setDragOverSlot(null);
    const sentIdx = draggedSentenceIdxRef.current;
    if (sentIdx !== null) attemptMatch(phraseIdx, sentIdx);
    draggedSentenceIdxRef.current = null;
  }

  // ── Tap handlers (mobile) ─────────────────────────────────────────────────
  function onAudioTap(sentenceIdx: number) {
    if (!lesson) return;
    // Always play audio on tap
    speakKorean(lesson.sentences[sentenceIdx].ko);
    // Toggle selection
    setSelectedAudio(prev => (prev === sentenceIdx ? null : sentenceIdx));
  }

  function onEnglishSlotTap(phraseIdx: number) {
    if (locked.has(phraseIdx)) {
      // Tap a locked slot → replay audio
      if (lesson) speakKorean(lesson.sentences[phraseIdx].ko);
      return;
    }
    if (selectedAudio !== null) {
      attemptMatch(phraseIdx, selectedAudio);
    }
  }

  // ── Locked sentenceIdx set (for hiding from right column) ─────────────────
  const lockedSentenceIdxSet = new Set(locked.values());

  if (!isLoaded || loading) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kt-lesson-view">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading" style={{ color: "var(--kt-gold)" }}>
          {error}{" "}
          <button className="kt-nav-link" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  const total = lesson.sentences.length;
  const matchedCount = locked.size;

  // Right column: only shows audio buttons not yet correctly locked
  const rightColumn = shuffledOrder.filter(si => !lockedSentenceIdxSet.has(si));

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
            <span className="kt-lesson-category-tag">{lesson.category ?? "Lesson"}</span>
            <span className="kt-lesson-badge" style={{ background: "rgba(112,148,204,0.15)", borderColor: "rgba(112,148,204,0.4)", color: "#7094cc" }}>
              Match the Audio
            </span>
            <span className="kt-lesson-sub-tag">Lesson {lessonId}</span>
          </div>

          <h1 className="kt-lesson-main-title">{lesson.title}</h1>

          <div className="kt-match-instructions">
            <p>
              Drag an audio button onto the English phrase it belongs to — or tap to select, then tap the phrase.
              A correct match plays the audio. All {total} matched → quiz begins.
            </p>
          </div>
        </div>

        {/* Completion banner */}
        {complete && (
          <div className="kt-match-complete">
            <span className="kt-match-complete-icon">🎯</span>
            All {total} matched! Starting quiz…
          </div>
        )}

        {/* Progress */}
        <div className="kt-match-progress-row">
          <div className="kt-match-progress-pill">
            <span className="kt-match-progress-count" style={{ color: matchedCount === total ? "#6daa7c" : "var(--kt-gold)" }}>
              {matchedCount}
            </span>
            <span className="kt-match-progress-total"> / {total}</span>
          </div>
          <div className="kt-match-progress-track">
            <div
              className="kt-match-progress-fill"
              style={{
                width: `${(matchedCount / total) * 100}%`,
                background: matchedCount === total ? "#6daa7c" : "var(--kt-gold)",
              }}
            />
          </div>
        </div>

        {/* Two-column matching area */}
        <div className="kt-match-layout">

          {/* LEFT — fixed English phrases with drop zones */}
          <div className="kt-match-left">
            <p className="kt-match-col-label">English phrases</p>
            {lesson.sentences.map((s, phraseIdx) => {
              const isLocked = locked.has(phraseIdx);
              const isOver = dragOverSlot === phraseIdx;
              const hasSelection = selectedAudio !== null && !isLocked;
              return (
                <div
                  key={phraseIdx}
                  className={[
                    "kt-match-en-row",
                    isLocked ? "kt-match-en-row--locked" : "",
                    isOver ? "kt-match-en-row--dragover" : "",
                    hasSelection ? "kt-match-en-row--droppable" : "",
                  ].filter(Boolean).join(" ")}
                  onDragOver={e => onSlotDragOver(e, phraseIdx)}
                  onDragLeave={onSlotDragLeave}
                  onDrop={e => onSlotDrop(e, phraseIdx)}
                  onClick={() => onEnglishSlotTap(phraseIdx)}
                >
                  <span className="kt-match-en-num">{String(phraseIdx + 1).padStart(2, "0")}</span>

                  <div className="kt-match-en-slot">
                    {isLocked ? (
                      <span className="kt-match-en-slot-filled">
                        <span className="kt-match-en-slot-check">✓</span>
                        <span className="kt-match-en-slot-audio-label">Audio matched</span>
                      </span>
                    ) : (
                      <span className="kt-match-en-slot-empty">
                        {hasSelection ? "tap to place" : "drop here"}
                      </span>
                    )}
                  </div>

                  <span className="kt-match-en-text">{s.en_context}</span>
                </div>
              );
            })}
          </div>

          {/* RIGHT — draggable audio buttons */}
          <div className="kt-match-right">
            <p className="kt-match-col-label">Audio clips — drag or tap</p>
            <div className="kt-match-audio-grid">
              {rightColumn.map((sentenceIdx, pos) => {
                const isSelected = selectedAudio === sentenceIdx;
                return (
                  <div
                    key={sentenceIdx}
                    className={["kt-match-audio-btn", isSelected ? "kt-match-audio-btn--selected" : ""].filter(Boolean).join(" ")}
                    draggable
                    onDragStart={() => onAudioDragStart(sentenceIdx)}
                    onDragEnd={onAudioDragEnd}
                    onClick={() => onAudioTap(sentenceIdx)}
                    title="Tap to hear · Drag to match"
                  >
                    <span className="kt-match-audio-play-icon">▶</span>
                    <span className="kt-match-audio-clip-label">Clip {pos + 1}</span>
                  </div>
                );
              })}

              {rightColumn.length === 0 && !complete && (
                <p style={{ color: "#555", fontSize: "0.8rem", fontStyle: "italic" }}>
                  All placed — verifying…
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Back link */}
        <div className="kt-lesson-nav-row" style={{ marginTop: "2.5rem" }}>
          <button
            className="kt-btn-ghost"
            onClick={() => setLocation(`/lessons/${lessonId}`)}
            style={{ fontSize: "0.8rem" }}
          >
            ← Back to Lesson
          </button>
        </div>

      </div>
    </div>
  );
}
