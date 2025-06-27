import { Exam } from '~common/types/exam.type';
import { WordCsv } from '~common/types/word-csv.type';
import { Word } from '~common/types/word.type';
import { database } from '~configs/database.config';

export const storeTrainingEntity = async (word: Word) => database.trainings.add(word);

export const deleteTrainingEntity = async (wordId: Word['id']) => database.trainings.delete(wordId);

const isTrainingEntityExists = async (wordId: Word['id']) => {
  const training = await database.trainings.get(wordId);

  return training !== undefined;
};

export const storeExamEntity = async (exams: Exam[]) => database.exams.add({ createdAt: Date.now(), exams: exams });

export const combineCsvData = async (words: WordCsv) => {
  const modifiedData = await Promise.all(
    words.rows.map<Promise<Word>>(async (row) => {
      const exists = typeof window === 'undefined' ? false : await isTrainingEntityExists(row.id);

      return { ...row, exists };
    })
  );

  return modifiedData;
};
