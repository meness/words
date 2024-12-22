import { useEffect, useState } from 'react';
import { ParsedExamplesCsv, ParsedWordsCsv } from '~common/types';
import { parseExamplesCsv, parseWordsCsv } from '~helpers';

export const useWords = () => {
  const [words, setWords] = useState<ParsedWordsCsv['rows']>([]);
  const [examples, setExamples] = useState<ParsedExamplesCsv['rows']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const wordsResponse = await fetch('/assets/csv/words.csv');
        const examplesResponse = await fetch('/assets/csv/examples.csv');
        const wordsData = await wordsResponse.text();
        const examplesData = await examplesResponse.text();

        setWords(parseWordsCsv(wordsData)['rows']);
        setExamples(parseExamplesCsv(examplesData)['rows']);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvFiles();
  }, []);

  return { words, examples, isLoading, isError };
};
