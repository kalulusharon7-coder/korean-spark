import { useUser, useClerk } from "@clerk/react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

interface LessonSummary {
  id: number;
  title: string;
  category: string;
  sub: string;
  theme: string;
  type: string;
  locked: boolean;
}

const CATEGORY_COLOURS: Record<string, string> = {
  Greetings:     "#6daa7c",
  Introductions: "#7094cc",
  Expressions:   "#c9a86c",
  Numbers:       "#aa7c9a",
  Vocabulary:    "#6daa7c",
  Time:          "#7094cc",
  Relationships: "#c9a86c",
  Food:          "#aa7c9a",
  Commerce:      "#6daa7c",
  Navigation:    "#7094cc",
  "Daily Life":  "#c9a86c",
  Interests:     "#aa7c9a",
  Work:          "#6daa7c",
  Wellbeing:     "#7094cc",
  Grammar:       "#c9a86c",
  Writing:       "#aa7c9a",
  Reference:     "#6daa7c",
};

function categoryColour(cat: string) {
  return CATEGORY_COLOURS[cat] ?? "#6daa7c";
}

function getCompletedLessons(): Set<number> {
  try {
    const raw = localStorage.getItem("kt_completed_lessons");
    if (raw) return new Set<number>(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set<number>();
}

export default function LessonsPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [, setLocation] = useLocation();
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [fetching, setFetching] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  const isSignedIn = isLoaded && !!user;

  // Load completed lesson IDs from localStorage on mount
  useEffect(() => {
    setCompletedIds(getCompletedLessons());
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/lessons`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setLessons(data.lessons ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  if (!isLoaded || fetching) {
    return (
      <div className="kt-lessons-page">
        <div className="grain-overlay" aria-hidden />
        <div className="kt-loading">Loading lessons…</div>
      </div>
    );
  }

  // Group lessons by category for display
  const categories = Array.from(new Set(lessons.map((l) => l.category)));

  return (
    <div className="kt-lessons-page">
      <div className="grain-overlay" aria-hidden />

      {/* Nav */}
      <nav className="kt-nav">
        <div className="kt-nav-logo" style={{ cursor: "pointer" }} onClick={() => setLocation("/")}>
          <img src="/kt-logo.png" alt="KT Vault" />
          <div className="kt-nav-brand">
            <span className="kt-nav-brand-name">KT Vault</span>
            <span className="kt-nav-brand-sub">Kala-Tala Communication</span>
          </div>
        </div>
        <div className="kt-nav-icons">
          {isSignedIn ? (
            <>
              <span className="kt-nav-user-name">
                {user.firstName ?? user.emailAddresses[0]?.emailAddress ?? "Learner"}
              </span>
              <button
                className="kt-cta-btn"
                style={{ background: "transparent", border: "1px solid rgba(45,74,50,0.6)", color: "var(--kt-cream-muted)", marginLeft: "0.5rem" }}
                onClick={() => signOut(() => setLocation("/"))}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="kt-nav-link" onClick={() => setLocation("/sign-in")}>Sign In</button>
              <a href={`${basePath}/sign-up`} className="kt-cta-btn">Create Account</a>
            </>
          )}
        </div>
      </nav>

      <div className="kt-section" style={{ paddingTop: "6rem", maxWidth: "860px", margin: "0 auto" }}>

        <p className="kt-section-label">The Curriculum</p>
        <h1 className="kt-section-title">
          {isSignedIn
            ? <>Your lessons, <em>unlocked.</em></>
            : <>Start with lesson one. <em>Free.</em></>}
        </h1>
        <p className="kt-section-body" style={{ marginBottom: "0.75rem" }}>
          {isSignedIn
            ? "You are Kala-Tala. Work through each lesson at your own pace — every step builds on the last."
            : "Lesson 1 is your test drive — no sign-up needed. Create a free account to unlock the full vault."}
        </p>

        {/* Hangul Playground — always-accessible standalone tool */}
        <div
          onClick={() => setLocation("/hangul-playground")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setLocation("/hangul-playground");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.25rem",
            margin: "1rem 0 1.5rem",
            background: "linear-gradient(135deg, rgba(109,170,124,0.12), rgba(112,148,204,0.08))",
            border: "1px solid rgba(109,170,124,0.4)",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.15s ease, border-color 0.15s ease",
          }}
        >
          <span style={{ fontSize: "2rem", lineHeight: 1, color: "#6daa7c" }}>가</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: "var(--kt-cream-light)", fontSize: "1rem", marginBottom: "0.15rem" }}>
              Hangul Playground
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--kt-cream-muted)" }}>
              Full chart · block builder · tracing · always open, never gated
            </div>
          </div>
          <span style={{ color: "#6daa7c", fontSize: "1.2rem" }}>→</span>
        </div>

        {/* Formality key */}
        <div className="kt-lessons-formality-key">
          <span style={{ color: "#6daa7c" }}>■ Polite</span>
          <span style={{ color: "#c9a86c" }}>■ Casual</span>
          <span style={{ color: "#7094cc" }}>■ Formal</span>
          <span style={{ opacity: 0.5 }}>· 3 forms per lesson · 10 sentences max · Kimchi Portion included</span>
        </div>

        {/* Lessons by category */}
        <div className="kt-lessons-categories">
          {categories.map((cat) => {
            const catLessons = lessons.filter((l) => l.category === cat);
            const colour = categoryColour(cat);
            return (
              <div key={cat} className="kt-lessons-category-block">
                <div className="kt-lessons-category-header">
                  <span className="kt-lessons-category-dot" style={{ background: colour }} />
                  <span className="kt-lessons-category-name" style={{ color: colour }}>{cat}</span>
                  <span className="kt-lessons-category-count">{catLessons.length} lessons</span>
                </div>
                <div className="kt-lessons-category-list">
                  {catLessons.map((lesson) => {
                    const accessible = lesson.id === 1 || isSignedIn;
                    return (
                      <div
                        key={lesson.id}
                        className={`kt-lesson-row ${accessible ? "kt-lesson-row--open" : "kt-lesson-row--locked"}`}
                        onClick={() => {
                          if (accessible) setLocation(`/lessons/${lesson.id}`);
                          else setLocation("/sign-up");
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (accessible) setLocation(`/lessons/${lesson.id}`);
                            else setLocation("/sign-up");
                          }
                        }}
                      >
                        <span className="kt-lesson-card-num" style={{ fontSize: "1.1rem" }}>
                          {String(lesson.id).padStart(2, "0")}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem" }}>
                            <span className="kt-lesson-card-tag">{lesson.type}</span>
                            <span className="kt-lesson-sub-indicator">({lesson.sub})</span>
                          </div>
                          <h3 className="kt-lesson-card-title" style={{ margin: 0, fontSize: "0.9rem" }}>
                            {lesson.title}
                          </h3>
                          <p className="kt-lesson-theme-text">{lesson.theme}</p>
                        </div>
                        <div className="kt-lesson-row-status">
                          {lesson.id === 1 && !completedIds.has(1) ? (
                            <span className="kt-lesson-badge kt-lesson-badge--free">Free</span>
                          ) : completedIds.has(lesson.id) ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : isSignedIn ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(200,185,154,0.35)" strokeWidth="1.6">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!isSignedIn && (
          <div className="kt-lessons-upsell">
            <p className="kt-lessons-upsell-text">
              ✦ &nbsp;Enjoyed your test drive? Create a free account to unlock all 80+ lessons.
            </p>
            <a href={`${basePath}/sign-up`} className="kt-btn-primary">
              Unlock the Vault — It's Free
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
