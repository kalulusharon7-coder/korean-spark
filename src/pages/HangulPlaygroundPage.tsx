import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { speakKorean } from "../lib/koreanTTS";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ───────────────────────── Hangul reference data ───────────────────────── */

type Jamo = {
  ch: string;
  name: string;
  sound: string;
  english?: string;
  example?: string;
  exampleMeaning?: string;
  note?: string;
};

const BASIC_CONSONANTS: Jamo[] = [
  { ch: "ㄱ", name: "기역 (giyeok)", sound: "g / k", english: "like g in 'go'", example: "가방", exampleMeaning: "bag" },
  { ch: "ㄴ", name: "니은 (nieun)", sound: "n", english: "like n in 'no'", example: "나무", exampleMeaning: "tree" },
  { ch: "ㄷ", name: "디귿 (digeut)", sound: "d / t", english: "like d in 'dog'", example: "다리", exampleMeaning: "leg / bridge" },
  { ch: "ㄹ", name: "리을 (rieul)", sound: "r / l", english: "between r and l", example: "라면", exampleMeaning: "ramen" },
  { ch: "ㅁ", name: "미음 (mieum)", sound: "m", english: "like m in 'mom'", example: "맛", exampleMeaning: "taste" },
  { ch: "ㅂ", name: "비읍 (bieup)", sound: "b / p", english: "like b in 'boy'", example: "바다", exampleMeaning: "sea" },
  { ch: "ㅅ", name: "시옷 (siot)", sound: "s", english: "like s in 'see'", example: "사랑", exampleMeaning: "love" },
  { ch: "ㅇ", name: "이응 (ieung)", sound: "silent / ng", english: "silent at start, 'ng' at end", example: "아기", exampleMeaning: "baby", note: "ㅇ is silent in initial position — it's a placeholder. At the end of a syllable, it sounds like 'ng'." },
  { ch: "ㅈ", name: "지읒 (jieut)", sound: "j", english: "like j in 'jump'", example: "집", exampleMeaning: "house" },
  { ch: "ㅊ", name: "치읓 (chieut)", sound: "ch", english: "aspirated ch", example: "차", exampleMeaning: "tea / car" },
  { ch: "ㅋ", name: "키읔 (kieuk)", sound: "k (aspirated)", english: "strong k with breath", example: "커피", exampleMeaning: "coffee" },
  { ch: "ㅌ", name: "티읕 (tieut)", sound: "t (aspirated)", english: "strong t with breath", example: "토끼", exampleMeaning: "rabbit" },
  { ch: "ㅍ", name: "피읖 (pieup)", sound: "p (aspirated)", english: "strong p with breath", example: "피자", exampleMeaning: "pizza" },
  { ch: "ㅎ", name: "히읗 (hieut)", sound: "h", english: "like h in 'hat'", example: "하늘", exampleMeaning: "sky" },
];

const DOUBLE_CONSONANTS: Jamo[] = [
  { ch: "ㄲ", name: "쌍기역 (ssang-giyeok)", sound: "kk (tense)", english: "tight, sharp k", example: "꿈", exampleMeaning: "dream" },
  { ch: "ㄸ", name: "쌍디귿 (ssang-digeut)", sound: "tt (tense)", english: "tight, sharp t", example: "딸", exampleMeaning: "daughter" },
  { ch: "ㅃ", name: "쌍비읍 (ssang-bieup)", sound: "pp (tense)", english: "tight, sharp p", example: "빵", exampleMeaning: "bread" },
  { ch: "ㅆ", name: "쌍시옷 (ssang-siot)", sound: "ss (tense)", english: "tight, sharp s", example: "쌀", exampleMeaning: "rice" },
  { ch: "ㅉ", name: "쌍지읒 (ssang-jieut)", sound: "jj (tense)", english: "tight, sharp j", example: "짜다", exampleMeaning: "salty" },
];

const BASIC_VOWELS: Jamo[] = [
  { ch: "ㅏ", name: "아 (a)", sound: "a", english: "like a in 'father'", example: "아빠", exampleMeaning: "dad" },
  { ch: "ㅑ", name: "야 (ya)", sound: "ya", english: "like ya in 'yard'", example: "야구", exampleMeaning: "baseball" },
  { ch: "ㅓ", name: "어 (eo)", sound: "eo", english: "like u in 'fun'", example: "어머니", exampleMeaning: "mother" },
  { ch: "ㅕ", name: "여 (yeo)", sound: "yeo", english: "like yu in 'young'", example: "여자", exampleMeaning: "woman" },
  { ch: "ㅗ", name: "오 (o)", sound: "o", english: "like o in 'go'", example: "오빠", exampleMeaning: "older brother (f)" },
  { ch: "ㅛ", name: "요 (yo)", sound: "yo", english: "like yo in 'yo-yo'", example: "요리", exampleMeaning: "cooking" },
  { ch: "ㅜ", name: "우 (u)", sound: "u", english: "like oo in 'too'", example: "우유", exampleMeaning: "milk" },
  { ch: "ㅠ", name: "유 (yu)", sound: "yu", english: "like you", example: "유리", exampleMeaning: "glass" },
  { ch: "ㅡ", name: "으 (eu)", sound: "eu", english: "like the in 'roses'", example: "그", exampleMeaning: "that" },
  { ch: "ㅣ", name: "이 (i)", sound: "i", english: "like ee in 'see'", example: "이", exampleMeaning: "two / tooth" },
];

const COMPOUND_VOWELS: Jamo[] = [
  { ch: "ㅐ", name: "애 (ae)", sound: "ae", english: "like a in 'cat'", example: "애기", exampleMeaning: "little baby" },
  { ch: "ㅒ", name: "얘 (yae)", sound: "yae", english: "ya + e", example: "얘", exampleMeaning: "this kid" },
  { ch: "ㅔ", name: "에 (e)", sound: "e", english: "like e in 'bed'", example: "에", exampleMeaning: "at / to" },
  { ch: "ㅖ", name: "예 (ye)", sound: "ye", english: "like ye in 'yes'", example: "예", exampleMeaning: "yes" },
  { ch: "ㅘ", name: "와 (wa)", sound: "wa", english: "like wa in 'water'", example: "와", exampleMeaning: "and / wow" },
  { ch: "ㅙ", name: "왜 (wae)", sound: "wae", english: "like wa in 'wax'", example: "왜", exampleMeaning: "why" },
  { ch: "ㅚ", name: "외 (oe)", sound: "we", english: "like we in 'weight'", example: "외국", exampleMeaning: "foreign country" },
  { ch: "ㅝ", name: "워 (wo)", sound: "wo", english: "like wo in 'won'", example: "원", exampleMeaning: "won (currency)" },
  { ch: "ㅞ", name: "웨 (we)", sound: "we", english: "like we in 'wet'", example: "웨딩", exampleMeaning: "wedding" },
  { ch: "ㅟ", name: "위 (wi)", sound: "wi", english: "like we in 'week'", example: "위", exampleMeaning: "above" },
  { ch: "ㅢ", name: "의 (ui)", sound: "uy", english: "eu + i blended", example: "의자", exampleMeaning: "chair" },
];

/* ─── Double batchim (final consonant clusters) — idiot + fancy versions ─── */

type DoubleBatchim = {
  ch: string;
  parts: string;
  main: string;
  ghost: string;
  feels: string;
  like: string;
  fancy: string;
  fancyNote: string;
  example: string;
  exampleMeaning: string;
};

const DOUBLE_BATCHIM: DoubleBatchim[] = [
  {
    ch: "ㄳ", parts: "ㄱ + ㅅ", main: "k", ghost: "a tiny hiss of air",
    feels: "k + a little “sss-air” at the end",
    like: "Like you’re trying to say “kss” but stop halfway.",
    fancy: "kʼ", fancyNote: "sharp release",
    example: "몫", exampleMeaning: "share / portion",
  },
  {
    ch: "ㄵ", parts: "ㄴ + ㅈ", main: "n", ghost: "tongue wants to make a “j” but doesn’t",
    feels: "n + tongue pushing up a bit",
    like: "Like your tongue is getting ready to say “j” but doesn’t.",
    fancy: "nʲ", fancyNote: "palatal tension",
    example: "앉다", exampleMeaning: "to sit",
  },
  {
    ch: "ㄶ", parts: "ㄴ + ㅎ", main: "n", ghost: "a soft breath",
    feels: "n + a tiny “h-breath”",
    like: "Like you sigh a little after saying “n.”",
    fancy: "nʰ", fancyNote: "breathy n",
    example: "많다", exampleMeaning: "to be many",
  },
  {
    ch: "ㄺ", parts: "ㄹ + ㄱ", main: "k", ghost: "tongue presses like an “L” first",
    feels: "L-shape → k",
    like: "Like your tongue taps the roof, then drops into a “k.”",
    fancy: "lk → k", fancyNote: "tongue tension → k",
    example: "닭", exampleMeaning: "chicken",
  },
  {
    ch: "ㄻ", parts: "ㄹ + ㅁ", main: "m", ghost: "tongue touches like an “L”",
    feels: "L-shape → m",
    like: "Like you start to say “L” but close your lips for “m.”",
    fancy: "lm → m", fancyNote: "dark L → m",
    example: "삶", exampleMeaning: "life",
  },
  {
    ch: "ㄼ", parts: "ㄹ + ㅂ", main: "l", ghost: "lips tighten like a “b”",
    feels: "L → lips squeeze → l",
    like: "Like your lips want to make a “b,” but don’t.",
    fancy: "lb → l", fancyNote: "labial tension",
    example: "넓다", exampleMeaning: "to be wide",
  },
  {
    ch: "ㄽ", parts: "ㄹ + ㅅ", main: "p", ghost: "a tiny “s-air”",
    feels: "p + sharp air",
    like: "Like a mini “psh” but cut short.",
    fancy: "lp → pʼ", fancyNote: "tense p",
    example: "곬", exampleMeaning: "channel / one way",
  },
  {
    ch: "ㄾ", parts: "ㄹ + ㅌ", main: "l", ghost: "a puff of air",
    feels: "l + tiny “t-air”",
    like: "Like your tongue taps for “l” and then you blow a little.",
    fancy: "lt → lʰ", fancyNote: "aspirated l",
    example: "핥다", exampleMeaning: "to lick",
  },
  {
    ch: "ㄿ", parts: "ㄹ + ㅍ", main: "l", ghost: "lips push like “p”",
    feels: "l + lip-push",
    like: "Like your lips prepare to pop but don’t.",
    fancy: "lp → lʰ", fancyNote: "p-burst influence",
    example: "읊다", exampleMeaning: "to recite",
  },
  {
    ch: "ㅀ", parts: "ㄹ + ㅎ", main: "l", ghost: "breath",
    feels: "l + soft “h-breath”",
    like: "Like you whisper after saying “l.”",
    fancy: "lʰ", fancyNote: "breathy l",
    example: "싫다", exampleMeaning: "to dislike",
  },
  {
    ch: "ㅄ", parts: "ㅂ + ㅅ", main: "p", ghost: "sharp “s-air”",
    feels: "p + sharp air",
    like: "Like a tiny “ps!” but cut short.",
    fancy: "ps → pʼ", fancyNote: "sharp p",
    example: "값", exampleMeaning: "price",
  },
];

/* ─────── Jamo indices for Hangul syllable composition (Unicode AC00) ─────── */

const INITIALS = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const MEDIALS = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const FINALS = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

function composeSyllable(initial: string, medial: string, finalC: string): string | null {
  const i = INITIALS.indexOf(initial);
  const m = MEDIALS.indexOf(medial);
  const f = FINALS.indexOf(finalC);
  if (i < 0 || m < 0 || f < 0) return null;
  return String.fromCharCode(0xac00 + (i * 21 + m) * 28 + f);
}

/* ─────────────────────── Small mini-dictionary of real words ─────────────────────── */

const REAL_WORDS: Record<string, string> = {
  "가": "go / family name", "나": "I / me", "다": "all / everything", "마": "do not (imperative)",
  "사": "four / death (homophone)", "자": "ruler / let's", "차": "tea / car", "하": "ha! (laugh)",
  "고": "and (connector)", "노": "no / oar", "도": "also / island", "모": "rice seedling",
  "보": "see (stem)", "소": "cow / small", "조": "Jo (surname)", "호": "lake (suffix)",
  "구": "nine / phrase", "누": "who (poetic)", "두": "two / head", "무": "radish / nothing",
  "부": "wealth / wife", "수": "number / water", "주": "give (stem)", "후": "after",
  "기": "spirit / energy", "니": "you (casual)", "디": "D", "미": "beauty",
  "비": "rain / cost", "시": "time / poetry", "지": "place / paper", "히": "-ly (adverb)",
  "강": "river", "공": "ball / zero", "방": "room", "상": "table / prize", "산": "mountain",
  "곰": "bear", "꿈": "dream", "달": "moon", "별": "star", "물": "water", "불": "fire",
  "집": "house", "책": "book", "밥": "rice / meal", "맛": "taste", "손": "hand", "눈": "eye / snow",
  "엄마": "mom", "아빠": "dad", "사랑": "love", "친구": "friend", "학교": "school",
};

/* ───────────────────────────────── Page ───────────────────────────────── */

export default function HangulPlaygroundPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [, setLocation] = useLocation();
  const isSignedIn = isLoaded && !!user;

  const [selectedJamo, setSelectedJamo] = useState<Jamo | null>(null);

  // Block builder state
  const [bbInitial, setBbInitial] = useState<string>("ㄱ");
  const [bbMedial, setBbMedial] = useState<string>("ㅏ");
  const [bbFinal, setBbFinal] = useState<string>("");
  const composed = composeSyllable(bbInitial, bbMedial, bbFinal);
  const composedMeaning = composed ? REAL_WORDS[composed] : null;

  // Tracing state
  const [traceChar, setTraceChar] = useState<string>("가");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [traceChar]);

  function getCanvasPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    drawingRef.current = true;
    lastPtRef.current = getCanvasPos(e);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  }
  function moveDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pt = getCanvasPos(e);
    const last = lastPtRef.current ?? pt;
    ctx.strokeStyle = "#6daa7c";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
  }
  function endDraw() {
    drawingRef.current = false;
    lastPtRef.current = null;
  }
  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Suggested syllables to trace
  const traceSuggestions = ["가", "나", "다", "마", "바", "사", "아", "자", "하", "안", "녕", "사", "랑", "한", "국"];

  return (
    <div className="kt-lessons-page">
      <div className="grain-overlay" aria-hidden />

      {/* Nav (same shell as LessonsPage for visual consistency) */}
      <nav className="kt-nav">
        <div className="kt-nav-logo" style={{ cursor: "pointer" }} onClick={() => setLocation("/")}>
          <img src="/kt-logo.png" alt="KT Vault" />
          <div className="kt-nav-brand">
            <span className="kt-nav-brand-name">KT Vault</span>
            <span className="kt-nav-brand-sub">Hangul Playground</span>
          </div>
        </div>
        <div className="kt-nav-icons">
          <button className="kt-nav-link" onClick={() => setLocation("/lessons")}>Lessons</button>
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

      <div className="kt-section" style={{ paddingTop: "6rem", maxWidth: "960px", margin: "0 auto" }}>
        <p className="kt-section-label">Foundation</p>
        <h1 className="kt-section-title">
          Hangul <em>Playground.</em>
        </h1>
        <p className="kt-section-body" style={{ marginBottom: "2rem" }}>
          A relaxing space to meet every Korean letter. Tap a character to hear it,
          build syllables in the block frame, and trace strokes with no scoring and no penalties.
          Always open — no lesson required.
        </p>

        {/* ─── Section 1: The Full Chart ─── */}
        <SectionTitle label="01" title="The Full Chart" sub="Tap any character to hear its sound and see an example word." />

        <JamoGrid title="Consonants (자음)" jamos={BASIC_CONSONANTS} onSelect={setSelectedJamo} accent="#6daa7c" />
        <JamoGrid title="Double consonants (쌍자음)" jamos={DOUBLE_CONSONANTS} onSelect={setSelectedJamo} accent="#aa7c9a" />
        <JamoGrid title="Vowels (모음)" jamos={BASIC_VOWELS} onSelect={setSelectedJamo} accent="#7094cc" />
        <JamoGrid title="Compound vowels (이중모음)" jamos={COMPOUND_VOWELS} onSelect={setSelectedJamo} accent="#c9a86c" />

        {/* Detail panel */}
        {selectedJamo && (
          <div style={detailPanelStyle}>
            <div style={{ fontSize: "4rem", lineHeight: 1, color: "var(--kt-cream-light)", minWidth: "90px", textAlign: "center" }}>
              {selectedJamo.ch}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--kt-cream-light)", marginBottom: "0.35rem" }}>
                {selectedJamo.name}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--kt-cream-muted)", marginBottom: "0.5rem" }}>
                Sound: <strong style={{ color: "#6daa7c" }}>{selectedJamo.sound}</strong>
                {selectedJamo.english ? <> · {selectedJamo.english}</> : null}
              </div>
              {selectedJamo.example && (
                <div style={{ fontSize: "0.85rem", color: "var(--kt-cream-muted)", marginBottom: "0.5rem" }}>
                  Example: <button onClick={() => speakKorean(selectedJamo.example!)} style={exampleBtnStyle}>{selectedJamo.example}</button>
                  {selectedJamo.exampleMeaning ? <span style={{ marginLeft: "0.5rem", opacity: 0.75 }}>({selectedJamo.exampleMeaning})</span> : null}
                </div>
              )}
              {selectedJamo.note && (
                <div style={{ fontSize: "0.8rem", color: "var(--kt-gold)", fontStyle: "italic", marginTop: "0.5rem" }}>
                  Note: {selectedJamo.note}
                </div>
              )}
            </div>
            <button onClick={() => speakKorean(selectedJamo.ch)} style={playBtnStyle}>
              ▶ Hear sound
            </button>
          </div>
        )}

        {/* ─── Section 2: Block Builder ─── */}
        <SectionTitle label="02" title="Block Builder" sub="Pick an initial consonant, a vowel, and (optionally) a final consonant. Korean syllables stack from left → right and top → bottom." />

        <div style={builderShellStyle}>
          {/* The composed block */}
          <div style={builderBlockStyle}>
            <div style={builderBigCharStyle}>{composed ?? "?"}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--kt-cream-muted)" }}>
              초성: <strong>{bbInitial}</strong> · 중성: <strong>{bbMedial}</strong>
              {bbFinal ? <> · 종성: <strong>{bbFinal}</strong></> : null}
            </div>
            {composed && (
              <div style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: composedMeaning ? "#6daa7c" : "var(--kt-cream-muted)" }}>
                {composedMeaning ? `“${composedMeaning}”` : "practice block"}
              </div>
            )}
            <button onClick={() => composed && speakKorean(composed)} disabled={!composed} style={{ ...playBtnStyle, marginTop: "0.75rem" }}>
              ▶ Play sound
            </button>
          </div>

          {/* Selectors */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", minWidth: 0 }}>
            <JamoPicker label="Initial (초성)" options={INITIALS} value={bbInitial} onChange={setBbInitial} />
            <JamoPicker label="Medial vowel (중성)" options={MEDIALS} value={bbMedial} onChange={setBbMedial} />
            <JamoPicker label="Final (종성) — optional" options={FINALS} value={bbFinal} onChange={setBbFinal} blankLabel="(none)" />
          </div>
        </div>

        {/* ─── Section 3: Tracing ─── */}
        <SectionTitle label="03" title="Tracing" sub="Pick a character and trace it with your finger or mouse. There's no scoring, no timer, no punishment — just practice." />

        <div style={{ marginBottom: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--kt-cream-muted)", marginRight: "0.4rem" }}>Try:</span>
          {traceSuggestions.map((c, i) => (
            <button
              key={`${c}-${i}`}
              onClick={() => setTraceChar(c)}
              style={{
                ...chipBtnStyle,
                borderColor: traceChar === c ? "#6daa7c" : "rgba(200,185,154,0.25)",
                color: traceChar === c ? "#6daa7c" : "var(--kt-cream-muted)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={traceShellStyle}>
          <div style={traceFrameStyle}>
            <span style={traceGhostStyle} aria-hidden>{traceChar}</span>
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              style={traceCanvasStyle}
              onPointerDown={startDraw}
              onPointerMove={moveDraw}
              onPointerUp={endDraw}
              onPointerCancel={endDraw}
              onPointerLeave={endDraw}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: "140px" }}>
            <button onClick={() => speakKorean(traceChar)} style={playBtnStyle}>▶ Hear it</button>
            <button onClick={clearCanvas} style={ghostBtnStyle}>Clear</button>
            <p style={{ fontSize: "0.75rem", color: "var(--kt-cream-muted)", margin: "0.5rem 0 0", lineHeight: 1.4 }}>
              Tip: Korean strokes usually go top → bottom and left → right. Take as long as you like.
            </p>
          </div>
        </div>

        {/* ─── Section 4: Double Batchim ─── */}
        <SectionTitle
          label="04"
          title="Double Batchim"
          sub="When two consonants stack at the bottom of a syllable, only one fully speaks — the other becomes a tiny ghost-sound that pushes, breathes, or nudges. Read the simple “Idiot” version, peek at the “Fancy” phonetics, and tap to hear a real word."
        />
        <DoubleBatchimSection />

        {/* ─── Section 5: Notes ─── */}
        <SectionTitle label="05" title="Quick Notes" sub="A few things that trip up new readers." />
        <ul style={notesListStyle}>
          <li><strong style={{ color: "#6daa7c" }}>ㅇ is silent at the start.</strong> It's a placeholder so every syllable has an initial consonant — 아 sounds like "a", not "nga".</li>
          <li><strong style={{ color: "#6daa7c" }}>ㅇ at the end sounds like "ng".</strong> 강 = "gang" (river).</li>
          <li><strong style={{ color: "#6daa7c" }}>Aspirated vs tense.</strong> ㅋ ㅌ ㅍ ㅊ add breath; ㄲ ㄸ ㅃ ㅆ ㅉ are tight and sharp with no breath.</li>
          <li><strong style={{ color: "#6daa7c" }}>Stacking rule.</strong> Tall vowels (ㅏ ㅓ ㅣ) sit to the right of the initial. Wide vowels (ㅗ ㅜ ㅡ) sit below it.</li>
          <li><strong style={{ color: "#6daa7c" }}>Final consonants soften.</strong> ㅂ ㅍ at the end all sound the same. ㄷ ㅌ ㅅ ㅈ ㅊ at the end also all sound the same.</li>
        </ul>

        <div style={{ marginTop: "2.5rem", padding: "1.5rem", border: "1px solid rgba(45,74,50,0.4)", borderRadius: "10px", background: "rgba(45,74,50,0.15)" }}>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--kt-cream-muted)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--kt-cream-light)" }}>This page is always open.</strong>{" "}
            It isn't gated by any lesson, and lessons never modify it. Pop in any time you want to refresh your reading, build a syllable, or just trace something for fun.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function SectionTitle({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ margin: "2.5rem 0 1rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--kt-gold)", fontWeight: 600 }}>{label}</span>
        <h2 style={{ margin: 0, fontSize: "1.4rem", color: "var(--kt-cream-light)", fontWeight: 500 }}>{title}</h2>
      </div>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--kt-cream-muted)", lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

function JamoGrid({
  title, jamos, onSelect, accent,
}: { title: string; jamos: Jamo[]; onSelect: (j: Jamo) => void; accent: string }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ fontSize: "0.8rem", color: accent, marginBottom: "0.5rem", fontWeight: 600 }}>{title}</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
        gap: "0.6rem",
      }}>
        {jamos.map((j) => (
          <button
            key={j.ch}
            onClick={() => { onSelect(j); speakKorean(j.ch); }}
            style={{
              padding: "1.1rem 0.5rem 0.8rem",
              background: "rgba(28,38,30,0.7)",
              border: "1px solid rgba(200,185,154,0.3)",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
              transition: "border-color 0.15s ease, transform 0.1s ease",
              color: "var(--kt-cream-light)",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = accent; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,185,154,0.3)"; }}
          >
            <span style={{ fontSize: "2.4rem", lineHeight: 1, color: "var(--kt-cream-light)", fontWeight: 500 }}>{j.ch}</span>
            <span style={{ fontSize: "0.74rem", color: "var(--kt-cream-light)", opacity: 0.9 }}>{j.sound}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function JamoPicker({
  label, options, value, onChange, blankLabel,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void; blankLabel?: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.75rem", color: "var(--kt-cream-muted)", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {options.map((opt, idx) => {
          const isActive = opt === value;
          return (
            <button
              key={`${opt}-${idx}`}
              onClick={() => onChange(opt)}
              style={{
                minWidth: "38px",
                height: "38px",
                padding: "0 0.4rem",
                background: isActive ? "rgba(109,170,124,0.18)" : "rgba(20,28,22,0.45)",
                border: `1px solid ${isActive ? "#6daa7c" : "rgba(200,185,154,0.18)"}`,
                color: isActive ? "#6daa7c" : "var(--kt-cream-light)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: opt === "" ? "0.7rem" : "1.05rem",
                fontFamily: "inherit",
              }}
            >
              {opt === "" ? (blankLabel ?? "—") : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DoubleBatchimSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      {/* Column headers (hidden on narrow screens, they re-label per card) */}
      {DOUBLE_BATCHIM.map((b) => (
        <div key={b.ch} style={batchimCardStyle}>
          {/* Character header */}
          <div style={batchimCharColStyle}>
            <div style={{ fontSize: "3rem", lineHeight: 1, color: "var(--kt-cream-light)", fontWeight: 500 }}>{b.ch}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--kt-cream-muted)", marginTop: "0.25rem" }}>{b.parts}</div>
            <button
              onClick={() => speakKorean(b.example)}
              aria-label={`Play pronunciation of ${b.example} (${b.exampleMeaning})`}
              style={{ ...playBtnStyle, marginTop: "0.6rem", padding: "0.35rem 0.7rem", fontSize: "0.78rem" }}
            >
              ▶ {b.example}
            </button>
            <div style={{ fontSize: "0.72rem", color: "var(--kt-cream-muted)", opacity: 0.8, marginTop: "0.3rem" }}>{b.exampleMeaning}</div>
          </div>

          {/* Side-by-side: Idiot version + Fancy version */}
          <div style={batchimPanelsStyle}>
            {/* Idiot version */}
            <div style={idiotPanelStyle}>
              <div style={panelLabelStyle("#6daa7c")}>Idiot version 🤫</div>
              <div style={{ fontSize: "0.85rem", color: "var(--kt-cream-light)", lineHeight: 1.55 }}>
                <div>Main sound: <strong style={{ color: "#6daa7c" }}>{b.main}</strong></div>
                <div style={{ color: "var(--kt-cream-muted)" }}>Ghost sound: {b.ghost}</div>
                <div style={{ marginTop: "0.4rem" }}>👉 Feels like: <strong>{b.feels}</strong></div>
                <div style={{ marginTop: "0.3rem", fontStyle: "italic", color: "var(--kt-cream-muted)" }}>{b.like}</div>
              </div>
            </div>

            {/* Fancy version */}
            <div style={fancyPanelStyle}>
              <div style={panelLabelStyle("#aa7c9a")}>Fancy version 🤔</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem", color: "#c9a8c4", fontWeight: 600, fontFamily: "monospace" }}>{b.fancy}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--kt-cream-muted)" }}>{b.fancyNote}</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--kt-cream-muted)", opacity: 0.7, marginTop: "0.5rem" }}>
                micro-sound note (the technical effect)
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Styles ───────────────────────── */

const batchimCardStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  background: "rgba(20,28,22,0.5)",
  border: "1px solid rgba(200,185,154,0.18)",
  borderRadius: "12px",
  flexWrap: "wrap",
  alignItems: "stretch",
};

const batchimCharColStyle: React.CSSProperties = {
  width: "120px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0.5rem",
  background: "rgba(45,74,50,0.2)",
  border: "1px dashed rgba(109,170,124,0.4)",
  borderRadius: "10px",
};

const batchimPanelsStyle: React.CSSProperties = {
  flex: 1,
  minWidth: "240px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "0.75rem",
};

const idiotPanelStyle: React.CSSProperties = {
  padding: "0.85rem 1rem",
  background: "rgba(109,170,124,0.1)",
  border: "1px solid rgba(109,170,124,0.4)",
  borderRadius: "10px",
};

const fancyPanelStyle: React.CSSProperties = {
  padding: "0.85rem 1rem",
  background: "rgba(170,124,154,0.08)",
  border: "1px solid rgba(170,124,154,0.3)",
  borderRadius: "10px",
};

const panelLabelStyle = (color: string): React.CSSProperties => ({
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 700,
  color,
  marginBottom: "0.5rem",
});

const detailPanelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
  padding: "1.25rem",
  marginTop: "1rem",
  background: "rgba(20,28,22,0.6)",
  border: "1px solid rgba(109,170,124,0.35)",
  borderRadius: "10px",
  flexWrap: "wrap",
};

const exampleBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(109,170,124,0.5)",
  color: "var(--kt-cream-light)",
  padding: "0.15rem 0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontFamily: "inherit",
};

const playBtnStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "rgba(109,170,124,0.18)",
  color: "#6daa7c",
  border: "1px solid #6daa7c",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  fontWeight: 600,
};

const ghostBtnStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "transparent",
  color: "var(--kt-cream-muted)",
  border: "1px solid rgba(200,185,154,0.3)",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontFamily: "inherit",
};

const chipBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.7rem",
  background: "rgba(20,28,22,0.5)",
  border: "1px solid rgba(200,185,154,0.25)",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "1rem",
  fontFamily: "inherit",
};

const builderShellStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  padding: "1.5rem",
  background: "rgba(20,28,22,0.5)",
  border: "1px solid rgba(200,185,154,0.18)",
  borderRadius: "12px",
  flexWrap: "wrap",
};

const builderBlockStyle: React.CSSProperties = {
  width: "180px",
  flexShrink: 0,
  padding: "1rem",
  background: "rgba(45,74,50,0.25)",
  border: "1px dashed rgba(109,170,124,0.5)",
  borderRadius: "10px",
  textAlign: "center",
};

const builderBigCharStyle: React.CSSProperties = {
  fontSize: "5rem",
  lineHeight: 1,
  color: "var(--kt-cream-light)",
  marginBottom: "0.5rem",
  fontWeight: 500,
};

const traceShellStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const traceFrameStyle: React.CSSProperties = {
  position: "relative",
  width: "400px",
  height: "400px",
  maxWidth: "100%",
  background: "rgba(20,28,22,0.6)",
  border: "1px solid rgba(200,185,154,0.25)",
  borderRadius: "10px",
  overflow: "hidden",
};

const traceGhostStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20rem",
  lineHeight: 1,
  color: "rgba(200,185,154,0.12)",
  pointerEvents: "none",
  userSelect: "none",
  fontWeight: 500,
};

const traceCanvasStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  touchAction: "none",
  cursor: "crosshair",
};

const notesListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "1.25rem",
  color: "var(--kt-cream-muted)",
  fontSize: "0.88rem",
  lineHeight: 1.7,
};
