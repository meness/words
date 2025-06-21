import { useMemo } from 'react';
import { useTrainings } from './use-trainings.hook';
import { useWords } from './use-words.hook';

export const useTrainingsPieChartData = () => {
  const trainings = useTrainings();
  const { data: words } = useWords();

  const data = useMemo(() => {
    if (!words) {
      return [];
    }

    const trainedCount = trainings.length;
    const wordsCount = words.length;

    return [
      { name: 'کلمات تمرین‌شده', value: trainedCount },
      { name: 'مجموع کلمات', value: wordsCount }
    ];
  }, [trainings, words]);

  return data;
};
