import { EntityTable } from 'dexie';
import { WordEntity } from './word.entity';

export type TrainingsTableEntity = EntityTable<WordEntity, 'id'>;
