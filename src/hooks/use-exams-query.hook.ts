import { useLiveQuery } from 'dexie-react-hooks';
import { databaseConfig } from '~configs';
import { ExamEntity } from '~entities';

export const useExamsQuery = () =>
  useLiveQuery<ExamEntity[], ExamEntity[]>(() => databaseConfig.exams.toArray(), [], []);
