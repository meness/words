'use client';

import { useEffect, useState } from 'react';
import { Word } from '~common/types/word.type';
import { isTrainingEntityExists } from '~helpers/database.helper';
import { CsvService } from '~services/csv.service';

export const useWords = () => {
  const [data, setData] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const words = await CsvService.getWords();
        const examples = await CsvService.getExamples();

        const modifiedData = await Promise.all(
          words.rows.map<Promise<Word>>(async (row) => {
            const exists = await isTrainingEntityExists(row.id);
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
