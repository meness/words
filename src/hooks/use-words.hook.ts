import { useEffect, useState } from 'react';
import { WordEntity } from '~entities';
import { isWordExists, parseExamplesCsv, parseWordsCsv } from '~helpers';

export const useWords = () => {
  const [words, setWords] = useState<WordEntity>([]);
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
        const examples = parseExamplesCsv(examplesData)['rows'];
        const mappedWords = await Promise.all(
          parseWordsCsv(wordsData)['rows'].map<Promise<WordEntity[number]>>(async (row) => {
            const exists = await isWordExists(row.id);
            const { example, translation } = examples.find((example) => example.id === row.id)!;

            return { ...row, exists, example, translation };
          })
        );

        setWords(mappedWords);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvFiles();
  }, []);

  return { words, isLoading, isError };
};
