import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/react";
import { useLocation } from "wouter";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Lessons", href: "#lessons" },
  { label: "Method", href: "#method" },
  { label: "Contact", href: "#contact" },
];

const HANGUL_SAMPLES = [
  { char: "안", roman: "an" },
  { char: "녕", roman: "nyeong" },
  { char: "하", roman: "ha" },
  { char: "세", roman: "se" },
  { char: "요", roman: "yo" },
];

const LESSON_PREVIEWS = [
  {
    num: "01",
    tag: "Foundation",
    title: "Communication Before Grammar",
    text: "Begin with what matters most — connecting with people. Sounds, rhythm, and expression before rules.",
  },
  {
    num: "02",
    tag: "Hangul",
    title: "The Korean Writing System",
    text: "Unlock the beauty and logic of Hangul. Each block tells a story — you will read within days.",
    locked: false,
  },
  {
    num: "03",
    tag: "Vocabulary",
    title: "Words That Open Doors",
    text: "Build a living vocabulary through context, not memorisation. Real words. Real situations.",
    locked: true,
  },
  {
    num: "41",
    tag: "Grammar",
    title: "Sentence Construction",
    text: "Drag. Drop. Understand. Our visual grammar method rewires how sentences feel — not just how they work.",
    locked: true,
  },
  {
    num: "61",
    tag: "Writing",
    title: "Your First Korean Words",
    text: "Put pen to character. Writing tasks that build muscle memory and confidence simultaneously.",
    locked: true,
  },
  {
    num: "80",
    tag: "Mastery",
    title: "Final Review",
    text: "A complete journey distilled. Every skill, every lesson, woven into one comprehensive capstone.",
    locked: true,
  },
];

const FEATURES = [
  {
    icon: "🎙",
    title: "Speech Recognition",
    text: "Speak Korean and receive instant, intelligent feedback. Our system scores pronunciation and guides your ear toward fluency.",
  },
  {
    icon: "✦",
    title: "Structured Unlocking",
    text: "Every lesson earned, not given. Progress through 80 carefully sequenced lessons that build on each other naturally.",
  },
  {
    icon: "⌘",
    title: "Grammar by Instinct",
    text: "Drag-and-drop grammar tasks after lesson 40 train your brain to feel correct Korean — before you can explain why.",
  },
  {
    icon: "✎",
    title: "Writing Practice",
    text: "Post-lesson 60 writing tasks combine everything you have learned into expressive, authentic Korean composition.",
  },
  {
    icon: "한",
    title: "Hangul Playground",
    text: "An always-open interactive space — full chart, syllable block builder, and stroke tracing. No lessons required, no gates, no scoring.",
    href: "/hangul-playground",
  },
  {
    icon: "∞",
    title: "Progress Tracking",
    text: "Your journey is recorded precisely. Return to any lesson, review your scores, and see exactly how far you have come.",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [, setLocation] = useLocation();
  const isSignedIn = isLoaded && !!user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden />

      {/* ── Navigation ─────────────────────────────────────── */}
      <nav
        className="kt-nav"
        style={{
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.6)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Logo mark only in nav */}
        <div className="kt-nav-logo">
          <img src="/kt-logo.png" alt="KT Vault logo" />
          <div className="kt-nav-brand">
            <span className="kt-nav-brand-name">KT Vault</span>
            <span className="kt-nav-brand-sub">Kala-Tala Communication</span>
          </div>
        </div>

        {/* Nav links — include all sections */}
        <div className="kt-nav-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              className="kt-nav-link"
              onClick={() => scrollTo(l.href)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Icons + CTA */}
        <div className="kt-nav-icons">
          {isSignedIn ? (
            <>
              <span className="kt-nav-user-name">
                {user!.firstName ?? user!.emailAddresses[0]?.emailAddress ?? "Learner"}
              </span>
              <button
                className="kt-cta-btn"
                style={{ background: "transparent", border: "1px solid rgba(45,74,50,0.6)", color: "var(--kt-cream-muted)", marginLeft: "0.5rem" }}
                onClick={() => setLocation("/lessons")}
              >
                My Lessons
              </button>
              <button
                className="kt-nav-link"
                style={{ marginLeft: "0.25rem" }}
                onClick={() => signOut(() => setLocation("/"))}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="kt-nav-link" onClick={() => setLocation("/sign-in")}>Sign In</button>
              <button className="kt-cta-btn" style={{ marginLeft: "0.5rem" }} onClick={() => setLocation("/lessons")}>
                Begin Learning
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero — logo IS the centrepiece ─────────────────── */}
      <section className="kt-hero">
        <div className="kt-hero-bg-glow" aria-hidden />

        {/* Large ghost Hangul behind everything */}
        <div className="kt-hero-hangul-bg" aria-hidden>
          <span className="kt-hero-hangul-char">한</span>
        </div>

        <div className="kt-hero-content">

          {/* Logo frame — logo integrated as the brand centrepiece */}
          <div className="kt-hero-logo-frame">
            {/* Decorative ring */}
            <div className="kt-hero-logo-ring" aria-hidden />
            {/* Star accent top-right */}
            <div className="kt-hero-logo-star" aria-hidden>✦</div>
            {/* The logo fills the frame */}
            <img src="/kt-logo.png" alt="Kala-Tala — KT Vault" className="kt-hero-logo-img" />
            {/* Tagline sits just below logo inside frame area */}
            <p className="kt-hero-logo-tag">before grammar.</p>
          </div>

          <h1 className="kt-hero-title">
            Korean<br />
            <em>Before Grammar</em>
          </h1>

          <div className="kt-hero-divider" />

          <p className="kt-hero-subtitle">
            Your voice is the sound of connection.
            Release your rhythm — speak your first sentence today.
          </p>

          {/* Hangul preview row */}
          <div className="kt-hero-hangul-row" aria-label="안녕하세요">
            {HANGUL_SAMPLES.map((h) => (
              <div className="kt-hero-hangul-item" key={h.char}>
                <span className="kt-hero-hangul-char-sm">{h.char}</span>
                <span className="kt-hero-hangul-roman">{h.roman}</span>
              </div>
            ))}
          </div>

          <div className="kt-hero-actions">
            <button className="kt-btn-primary" onClick={() => setLocation("/lessons/1")}>
              Try Lesson 1 — Free
            </button>
            <button className="kt-btn-ghost" onClick={() => setLocation("/lessons")}>
              See All Lessons
            </button>
          </div>
        </div>

        <div className="kt-hero-scroll-hint" aria-hidden>
          <span className="kt-hero-scroll-text">Scroll</span>
          <div className="kt-hero-scroll-line" />
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <div className="kt-stats-bar">
        <div className="kt-stats-inner">
          {[
            { num: "80", label: "Lessons" },
            { num: "3", label: "Learning Paths" },
            { num: "100%", label: "Structured" },
            { num: "∞", label: "Revisitable" },
          ].map((s) => (
            <div className="kt-stat" key={s.label}>
              <span className="kt-stat-num">{s.num}</span>
              <span className="kt-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── About — KT Vault philosophy ────────────────────── */}
      <section className="kt-approach" id="about">
        <div className="kt-section">
          <div className="kt-approach-grid">
            <div>
              <p className="kt-section-label">Our Philosophy</p>
              <h2 className="kt-section-title">
                Release the<br />
                <em>Rhythm ✦</em>
              </h2>

              <p className="kt-section-body">
                <strong style={{ color: "var(--kt-cream-light)", fontStyle: "normal" }}>KT Vault</strong> stands
                for <strong style={{ color: "var(--kt-gold)" }}>Kala-Tala</strong> — a combination of two words
                from two different cultures, meaning <em>"to release the rhythm."</em> The star represents
                that release. Because your voice is the sound of connection.
              </p>
              <br />
              <p className="kt-section-body">
                Our aim is simple: get you communicating your first sentence <em>today.</em> Perfection comes
                with practice, and here at KT Vault, you are Kala-Tala — we are the vault — and together
                we get you speaking your new language in no time.
              </p>
              <br />
              <p className="kt-section-body">
                Communication is not about being perfect. It is about getting your message across.
                KT Vault gives you the <strong style={{ color: "var(--kt-cream-light)" }}>confidence to communicate and make connections.</strong> We
                embrace the imperfections and teach language the way humans naturally learn.
              </p>

              {/* Kala-Tala etymology display */}
              <div className="kt-etymology">
                <div className="kt-etymology-word">
                  <span className="kt-etymology-term">Kala</span>
                  <span className="kt-etymology-dash">—</span>
                  <span className="kt-etymology-meaning">to release</span>
                </div>
                <div className="kt-etymology-sep">✦</div>
                <div className="kt-etymology-word">
                  <span className="kt-etymology-term">Tala</span>
                  <span className="kt-etymology-dash">—</span>
                  <span className="kt-etymology-meaning">the rhythm</span>
                </div>
              </div>
            </div>

            <div className="kt-approach-cards">
              {[
                {
                  icon: "✦",
                  title: "You Are Kala-Tala",
                  text: "You already have the rhythm inside you. KT Vault is the vault that holds the tools to release it — one lesson at a time.",
                },
                {
                  icon: "耳",
                  title: "Communication First",
                  text: "Grammar follows understanding. Your first goal is your first sentence — spoken, felt, and understood by another person.",
                },
                {
                  icon: "한",
                  title: "Embrace Imperfection",
                  text: "We teach language the way humans naturally learn it — through use, through error, through the joy of being understood.",
                },
                {
                  icon: "∞",
                  title: "Progress, Not Perfection",
                  text: "Every lesson earned opens the next. Every attempt — perfect or not — brings you closer to fluency.",
                },
              ].map((c) => (
                <div className="kt-approach-card" key={c.title}>
                  <div className="kt-approach-icon">{c.icon}</div>
                  <div>
                    <h3 className="kt-approach-card-title">{c.title}</h3>
                    <p className="kt-approach-card-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lessons preview ────────────────────────────────── */}
      <section className="kt-lessons-preview" id="lessons">
        <div className="kt-section">
          <div className="kt-lessons-header">
            <div>
              <p className="kt-section-label">The Curriculum</p>
              <h2 className="kt-section-title" style={{ marginBottom: 0 }}>
                80 lessons.<br />
                <em>One clear path.</em>
              </h2>
            </div>
            <a href="https://ktvault.uk" className="kt-btn-primary">
              View All Lessons
            </a>
          </div>

          <div className="kt-lesson-cards">
            {LESSON_PREVIEWS.map((l) => (
              <div className="kt-lesson-card" key={l.num}>
                <span className="kt-lesson-card-num" aria-hidden>{l.num}</span>
                <span className="kt-lesson-card-tag">{l.tag}</span>
                <h3 className="kt-lesson-card-title">{l.title}</h3>
                <p className="kt-lesson-card-text">{l.text}</p>
                {l.locked && (
                  <div className="kt-lesson-card-locked">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Unlocks with progress
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ──────────────────────────────────────────── */}
      <div className="kt-quote-section">
        <div className="kt-quote-mark">"</div>
        <p className="kt-quote-text">
          Communication is not about perfect.<br />
          It is about getting your message across.
        </p>
        <p className="kt-quote-source">— Kala-Tala Communication · KT Vault</p>
      </div>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="kt-features" id="method">
        <div className="kt-section">
          <p className="kt-section-label">Platform Features</p>
          <h2 className="kt-section-title">
            Everything you need<br />
            <em>to reach fluency</em>
          </h2>
          <div className="kt-features-grid">
            {FEATURES.map((f) => {
              const clickable = "href" in f && typeof f.href === "string";
              return (
                <div
                  className="kt-feature"
                  key={f.title}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={clickable ? () => setLocation(f.href!) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => { if (e.key === "Enter") setLocation(f.href!); }
                      : undefined
                  }
                  style={clickable ? { cursor: "pointer" } : undefined}
                >
                  <span className="kt-feature-icon">{f.icon}</span>
                  <h3 className="kt-feature-title">
                    {f.title}
                    {clickable && (
                      <span style={{ marginLeft: "0.5rem", color: "var(--kt-gold)", fontSize: "0.85em" }}>→</span>
                    )}
                  </h3>
                  <p className="kt-feature-text">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────── */}
      <section className="kt-cta-banner" id="contact">
        <p className="kt-section-label" style={{ textAlign: "center" }}>Begin Today</p>
        <h2 className="kt-cta-banner-title">
          Speak your first<br />
          Korean sentence <em>today</em>
        </h2>
        <p className="kt-cta-banner-sub">
          You are Kala-Tala. We are the vault. Together we get you speaking
          Korean — with confidence, connection, and no fear of imperfection.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="https://ktvault.uk" className="kt-btn-primary">
            Open KT Vault
          </a>
          <button className="kt-btn-ghost" onClick={() => scrollTo("#lessons")}>
            Preview Lessons
          </button>
        </div>
      </section>

      {/* ── Footer — clean, no duplicate nav links ──────────── */}
      <footer className="kt-footer">
        <div className="kt-footer-inner">
          <div className="kt-footer-logo">
            <img src="/kt-logo.png" alt="KT Vault" />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <span className="kt-footer-brand">KT Vault</span>
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "var(--kt-green-light)", textTransform: "uppercase" }}>
                Kala-Tala Communication
              </span>
            </div>
          </div>
          <span className="kt-footer-copy">
            © {new Date().getFullYear()} KT Vault · ktvault.uk · Release the rhythm ✦
          </span>
        </div>
      </footer>
    </>
  );
}
