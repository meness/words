import { Exam, Word } from '~common/types';
import { databaseConfig } from '~configs';

export const storeTrainingEntity = async (word: Word) => databaseConfig.trainings.add(word);

export const deleteTrainingEntity = async (wordId: Word['id']) => databaseConfig.trainings.delete(wordId);

export const isTrainingEntityExists = async (wordId: Word['id']) => {
  const training = await databaseConfig.trainings.get(wordId);

  return training !== undefined;
};

export const storeExamEntity = async (exams: Exam[]) =>
  databaseConfig.exams.add({ createdAt: Date.now(), exam: exams });
