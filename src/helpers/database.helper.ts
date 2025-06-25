import { Exam } from '~common/types/exam.type';
import { ExampleCsv } from '~common/types/example-csv.type';
import { WordCsv } from '~common/types/word-csv.type';
import { Word } from '~common/types/word.type';
import { database } from '~configs/database.config';

export const storeTrainingEntity = async (word: Word) => database.trainings.add(word);

export const deleteTrainingEntity = async (wordId: Word['id']) => database.trainings.delete(wordId);

export const isTrainingEntityExists = async (wordId: Word['id']) => {
  const training = await database.trainings.get(wordId);

  return training !== undefined;
};

export const storeExamEntity = async (exams: Exam[]) => database.exams.add({ createdAt: Date.now(), exams: exams });

export const combineCsvData = async (words: WordCsv, examples: ExampleCsv) => {
  const modifiedData = await Promise.all(
    words.rows.map<Promise<Word>>(async (row) => {
      const exists = typeof window === 'undefined' ? false : await isTrainingEntityExists(row.id);
      const { example, translation } = examples.rows.find((example) => example.id === row.id)!;

      return { ...row, exists, example, translation };
    })
  );

  return modifiedData;
};
