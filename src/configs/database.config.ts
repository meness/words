'use client';

import Dexie from 'dexie';
import { ExamsDbTable } from '~entities/exams-db-table.entity';
import { TrainingsDbTable } from '~entities/trainings-db-table.entity';

export const database = new Dexie('w', { autoOpen: true, cache: 'immutable' }) as Dexie & {
  trainings: TrainingsDbTable;
  exams: ExamsDbTable;
};

database.version(1).stores({
  trainings: '++id'
});

database.version(2).stores({
  trainings: '++id',
  exams: '++id'
});
