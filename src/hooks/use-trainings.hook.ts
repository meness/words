'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { database } from '~configs/database.config';
import { WordResponse } from '~entities/word-response.entity';

export const useTrainings = () =>
  useLiveQuery<WordResponse[], WordResponse[]>(() => database.trainings.toArray(), [], []);
