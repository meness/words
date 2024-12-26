import { useLiveQuery } from 'dexie-react-hooks';
import { databaseConfig } from '~configs';
import { WordEntity } from '~entities';

export const useTrainingsQuery = () =>
  useLiveQuery<WordEntity[], WordEntity[]>(() => databaseConfig.trainings.toArray(), [], []);
