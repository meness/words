import { Exam } from '~common/types/exam.type';

export type ExamResponse = {
  id: number;
  exams: Exam[];
  createdAt: number;
};
