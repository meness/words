import { EntityTable } from 'dexie';
import { ExamEntity } from './exam.entity';

export type ExamsTableEntity = EntityTable<ExamEntity, 'id'>;
