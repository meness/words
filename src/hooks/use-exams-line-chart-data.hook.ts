import { useMemo } from 'react';
import { formatDate } from '~utils/date.util';
import { useExams } from './use-exams.hook';

export const useExamsLineChartData = () => {
  const exams = useExams();

  const data = useMemo(() => {
    const grouped = exams.reduce(
      (acc, entity) => {
        const month = formatDate(entity.createdAt);

        if (!acc[month]) {
          acc[month] = { total: 0, mistakes: 0, accuracies: 0 };
        }

        acc[month].total += 1;
        acc[month].mistakes += entity.exams.filter((exam) => exam.question.id !== exam.answer?.id).length;
        acc[month].accuracies += entity.exams.filter((exam) => exam.question.id === exam.answer?.id).length;

        return acc;
      },
      {} as Record<string, { total: number; mistakes: number; accuracies: number }>
    );

    return Object.entries(grouped).map(([month, { total, mistakes, accuracies }]) => ({
      month,
      total,
      mistakes,
      accuracies
    }));
  }, [exams]);

  return data;
};
