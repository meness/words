'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { database } from '~configs/database.config';
import { ExamResponse } from '~entities/exam-response.entity';

export const useExams = () => useLiveQuery<ExamResponse[], ExamResponse[]>(() => database.exams.toArray(), [], []);
