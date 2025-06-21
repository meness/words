import { EntityTable } from 'dexie';
import { WordResponse } from './word-response.entity';

export type TrainingsDbTable = EntityTable<WordResponse, 'id'>;
