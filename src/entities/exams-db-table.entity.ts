import { EntityTable } from 'dexie';
import { ExamResponse } from './exam-response.entity';

export type ExamsDbTable = EntityTable<ExamResponse, 'id'>;
