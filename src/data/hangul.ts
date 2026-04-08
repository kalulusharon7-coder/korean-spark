export interface HangulChar {
  character: string;
  romanization: string;
  name: string;
  type: 'consonant' | 'vowel';
  sound: string;
}

export const basicConsonants: HangulChar[] = [
  { character: 'ㄱ', romanization: 'g/k', name: '기역 (giyeok)', type: 'consonant', sound: 'g as in "go"' },
  { character: 'ㄴ', romanization: 'n', name: '니은 (nieun)', type: 'consonant', sound: 'n as in "no"' },
  { character: 'ㄷ', romanization: 'd/t', name: '디귿 (digeut)', type: 'consonant', sound: 'd as in "do"' },
  { character: 'ㄹ', romanization: 'r/l', name: '리을 (rieul)', type: 'consonant', sound: 'r/l blend' },
  { character: 'ㅁ', romanization: 'm', name: '미음 (mieum)', type: 'consonant', sound: 'm as in "mom"' },
  { character: 'ㅂ', romanization: 'b/p', name: '비읍 (bieup)', type: 'consonant', sound: 'b as in "boy"' },
  { character: 'ㅅ', romanization: 's', name: '시옷 (siot)', type: 'consonant', sound: 's as in "sun"' },
  { character: 'ㅇ', romanization: 'ng/silent', name: '이응 (ieung)', type: 'consonant', sound: 'silent at start, ng at end' },
  { character: 'ㅈ', romanization: 'j', name: '지읒 (jieut)', type: 'consonant', sound: 'j as in "joke"' },
  { character: 'ㅊ', romanization: 'ch', name: '치읓 (chieut)', type: 'consonant', sound: 'ch as in "chin"' },
  { character: 'ㅋ', romanization: 'k', name: '키읔 (kieuk)', type: 'consonant', sound: 'k as in "kite"' },
  { character: 'ㅌ', romanization: 't', name: '티읕 (tieut)', type: 'consonant', sound: 't as in "top"' },
  { character: 'ㅍ', romanization: 'p', name: '피읖 (pieup)', type: 'consonant', sound: 'p as in "pie"' },
  { character: 'ㅎ', romanization: 'h', name: '히읗 (hieut)', type: 'consonant', sound: 'h as in "hat"' },
];

export const basicVowels: HangulChar[] = [
  { character: 'ㅏ', romanization: 'a', name: '아 (a)', type: 'vowel', sound: 'a as in "father"' },
  { character: 'ㅑ', romanization: 'ya', name: '야 (ya)', type: 'vowel', sound: 'ya as in "yacht"' },
  { character: 'ㅓ', romanization: 'eo', name: '어 (eo)', type: 'vowel', sound: 'uh as in "son"' },
  { character: 'ㅕ', romanization: 'yeo', name: '여 (yeo)', type: 'vowel', sound: 'yuh' },
  { character: 'ㅗ', romanization: 'o', name: '오 (o)', type: 'vowel', sound: 'o as in "go"' },
  { character: 'ㅛ', romanization: 'yo', name: '요 (yo)', type: 'vowel', sound: 'yo as in "yoyo"' },
  { character: 'ㅜ', romanization: 'u', name: '우 (u)', type: 'vowel', sound: 'oo as in "boo"' },
  { character: 'ㅠ', romanization: 'yu', name: '유 (yu)', type: 'vowel', sound: 'yoo' },
  { character: 'ㅡ', romanization: 'eu', name: '으 (eu)', type: 'vowel', sound: 'eu (no English equivalent)' },
  { character: 'ㅣ', romanization: 'i', name: '이 (i)', type: 'vowel', sound: 'ee as in "see"' },
];
