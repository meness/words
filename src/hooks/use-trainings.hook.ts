import { useLiveQuery } from 'dexie-react-hooks';
import { Word } from '~common/types';
import { databaseConfig } from '~configs';

export const useTrainings = () => useLiveQuery<Word[], Word[]>(() => databaseConfig.trainings.toArray(), [], []);
