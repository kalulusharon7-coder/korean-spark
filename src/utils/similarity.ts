export function koreanSimilarity(spoken: string, target: string): number {
  const cleanSpoken = spoken.replace(/[.\s!?，。]/g, '').toLowerCase();
  const cleanTarget = target.replace(/[.\s!?，。]/g, '').toLowerCase();

  if (cleanSpoken === cleanTarget) return 1;
  if (cleanSpoken.length === 0) return 0;

  // Character-level comparison
  const targetChars = [...cleanTarget];
  const spokenChars = [...cleanSpoken];

  let matches = 0;
  for (const char of spokenChars) {
    if (targetChars.includes(char)) {
      matches++;
    }
  }

  const charSimilarity = matches / Math.max(targetChars.length, 1);

  // Length similarity
  const lengthRatio = Math.min(spokenChars.length, targetChars.length) / Math.max(spokenChars.length, targetChars.length, 1);

  // Levenshtein distance normalized
  const distance = levenshtein(cleanSpoken, cleanTarget);
  const maxLen = Math.max(cleanSpoken.length, cleanTarget.length, 1);
  const editSimilarity = 1 - distance / maxLen;

  return (charSimilarity * 0.3 + editSimilarity * 0.5 + lengthRatio * 0.2);
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

export function getFeedbackMessage(similarity: number): { message: string; type: 'success' | 'good' | 'encourage' } {
  if (similarity >= 0.8) {
    return { message: "Great job! You communicated that perfectly! 🎉", type: 'success' };
  } else if (similarity >= 0.5) {
    return { message: "Nice attempt — you got the idea across! Here's how a native would say it.", type: 'good' };
  } else {
    return { message: "Good try! Keep practicing — you're building real Korean, sentence by sentence. 💪", type: 'encourage' };
  }
}
