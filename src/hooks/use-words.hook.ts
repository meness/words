'use client';

import { useEffect, useState } from 'react';
import { Word } from '~common/types/word.type';
import { combineCsvData } from '~helpers/database.helper';
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
        const combinedData = await combineCsvData(words, examples);

        setData(combinedData);
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
