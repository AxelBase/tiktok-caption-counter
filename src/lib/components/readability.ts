// Estimate syllables in a word (heuristic)
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;

  // Basic vowel group heuristic
  const vowelGroups = word.match(/[aeiouy]+/g);
  let syllables = vowelGroups ? vowelGroups.length : 0;

  // Adjustments
  if (word.endsWith('e')) syllables--;
  if (syllables < 1) syllables = 1;

  return syllables;
}

// Compute Flesch Reading Ease score
export function fleschReadingEase(text: string): number {
  const sentences = text.split(/[\.\!\?]+/).filter((s) => s.trim().length > 0).length || 1;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length || 1;

  let syllableCount = 0;
  for (const w of words) {
    syllableCount += countSyllables(w);
  }

  const ASL = totalWords / sentences; // Average sentence length
  const ASW = syllableCount / totalWords; // Average syllables per word

  return Math.round(206.835 - 1.015 * ASL - 84.6 * ASW);
}

// Highlight complex words or long sentences
export function highlightComplex(text: string): string {
  const sentences = text.split(/([.!?]+)/);

  return sentences
    .map((s) => {
      const words = s.trim().split(/\s+/);
      const isLong = words.length > 20;
      return words
        .map((w) => {
          if (w.length > 12) {
            return `<mark title="Complex word">${w}</mark>`;
          }
          return w;
        })
        .join(' ') + (isLong ? ' <mark title="Long sentence">[...]</mark>' : '');
    })
    .join(' ');
}
