import { useEffect, useState } from 'react';
import { CsvApi } from '~apis';
import { Word } from '~common/types';
import { isTrainingExists } from '~helpers';

export const useWords = () => {
  const [data, setData] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const words = await CsvApi.getWords();
        const examples = await CsvApi.getExamples();

        const modifiedData = await Promise.all(
          words.rows.map<Promise<Word>>(async (row) => {
            const exists = await isTrainingExists(row.id);
            const { example, translation } = examples.rows.find((example) => example.id === row.id)!;

            return { ...row, exists, example, translation };
          })
        );

        setData(modifiedData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvFiles();
  }, []);

  return { data, isLoading, isError };
};
