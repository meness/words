import { Word } from '~common/types';
import { databaseConfig } from '~configs';

export const storeTraining = async (word: Word) => databaseConfig.trainings.add(word);

export const deleteTraining = async (wordId: Word['id']) => databaseConfig.trainings.delete(wordId);

export const isTrainingExists = async (wordId: Word['id']) => {
  const training = await databaseConfig.trainings.get(wordId);

  return training !== undefined;
};
