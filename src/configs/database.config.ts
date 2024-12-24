import Dexie, { EntityTable } from 'dexie';
import { Word } from '~common/types';

export const databaseConfig = new Dexie('w', { autoOpen: true, cache: 'immutable' }) as Dexie & {
  trainings: EntityTable<Word, 'id'>;
};

databaseConfig.version(1).stores({
  trainings: '++id'
});
