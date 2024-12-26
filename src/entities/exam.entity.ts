import { Exam } from '~common/types';

export type ExamEntity = {
  id: number;
  exam: Exam[];
  createdAt: number;
};
