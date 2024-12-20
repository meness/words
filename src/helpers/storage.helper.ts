export const learnWord = (word: string, isChecked: boolean) => {
  const key = `word_learned-${word.toLowerCase().replace(/\s+/, '_')}`;

  localStorage.setItem(key, String(isChecked));
};

export const isWordLearned = (word: string) => {
  const key = `word_learned-${word.toLowerCase().replace(/\s+/, '_')}`;

  return localStorage.getItem(key) === 'true';
};
