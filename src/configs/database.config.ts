import Dexie from 'dexie';
import { ExamsTableEntity, TrainingsTableEntity } from '~entities';

export const databaseConfig = new Dexie('w', { autoOpen: true, cache: 'immutable' }) as Dexie & {
  trainings: TrainingsTableEntity;
  exams: ExamsTableEntity;
};

databaseConfig.version(1).stores({
  trainings: '++id'
});

databaseConfig.version(2).stores({
  trainings: '++id',
  exams: '++id'
});
