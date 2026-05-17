/**
 * Korean text-to-speech helper.
 *
 * Wraps the Web Speech API and works around the most common cross-device
 * issues that make Listen buttons fail silently:
 *
 *  1. Voices are loaded asynchronously on most browsers (especially Chrome
 *     on Android). Calling speak() before voices are ready may produce no
 *     audio. We wait for `voiceschanged` once.
 *
 *  2. Many browsers won't pick a Korean voice just from `utter.lang`.
 *     We explicitly select the best matching ko-KR voice if one exists.
 *
 *  3. Some devices (frequently Samsung tablets out of the box) have NO
 *     Korean TTS voice installed. We detect this and surface a one-time
 *     alert telling the user how to fix it, so the button never silently
 *     does nothing.
 */

type SpeakOpts = {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
};

let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;
let warnedNoKorean = false;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return Promise.resolve([]);
  }
  if (voicesPromise) return voicesPromise;
  voicesPromise = new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    const handler = () => {
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", handler);
    // Safety timeout — some browsers never fire the event.
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    }, 1500);
  });
  return voicesPromise;
}

function pickKoreanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  // Prefer exact ko-KR, then any ko-*, then anything with "Korean" in the name.
  return (
    voices.find((v) => v.lang === "ko-KR") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("ko")) ??
    voices.find((v) => /korean/i.test(v.name)) ??
    null
  );
}

export async function speakKorean(text: string, opts: SpeakOpts = {}): Promise<void> {
  if (!text) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alert("This browser doesn't support voice playback. Try Chrome or Edge.");
    opts.onError?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  const voices = await loadVoices();
  const koVoice = pickKoreanVoice(voices);

  if (!koVoice && !warnedNoKorean) {
    warnedNoKorean = true;
    const isAndroid = /android/i.test(navigator.userAgent);
    const fixHint = isAndroid
      ? "On your device: Settings → General Management → Text-to-speech → Languages → install Korean."
      : "Install a Korean voice in your operating system's speech settings, then refresh this page.";
    alert(`No Korean voice is installed on this device, so the Listen button can't speak Korean.\n\n${fixHint}`);
    opts.onError?.();
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = opts.rate ?? 0.85;
  if (koVoice) utter.voice = koVoice;
  utter.onstart = () => opts.onStart?.();
  utter.onend = () => opts.onEnd?.();
  utter.onerror = () => opts.onError?.();
  synth.speak(utter);
}

export function cancelKorean(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
