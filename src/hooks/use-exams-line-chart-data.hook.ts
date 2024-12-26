import { useMemo } from 'react';
import { useExamsQuery } from './use-exams-query.hook';

export const useExamsLineChartData = () => {
  const exams = useExamsQuery();

  const data = useMemo(() => {
    const grouped = exams.reduce(
      (acc, entity) => {
        const month = Intl.DateTimeFormat('fa-IR', {
          calendar: 'persian',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(entity.createdAt);

        if (!acc[month]) {
          acc[month] = { total: 0, mistakes: 0, accuracies: 0 };
        }

        acc[month].total += 1;
        acc[month].mistakes += entity.exam.filter((exam) => exam.question.id !== exam.answer?.id).length;
        acc[month].accuracies += entity.exam.filter((exam) => exam.question.id === exam.answer?.id).length;

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
