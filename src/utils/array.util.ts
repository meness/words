import { Word } from '~common/types/word.type';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

export const getRandomWordsExcludingIndex = (words: Word[], currentWord: Word, count: number) => {
  const currentIndex = words.findIndex((data) => data.id === currentWord.id);
  const availableItems = words.filter((_, index) => index !== currentIndex);

  if (availableItems.length <= count) {
    return availableItems;
  }

  const shuffled = shuffleArray(availableItems);

  return shuffled.slice(0, count);
};
