import { useEffect, useState } from 'react';
import { CsvApi } from '~apis';
import { WordEntity } from '~entities';
import { isWordExists, parseExamplesCsv, parseWordsCsv } from '~helpers';

export const useData = () => {
  const [data, setData] = useState<WordEntity>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const wordsResponse = await CsvApi.getWords();
        const examplesResponse = await CsvApi.getExamples();
        const wordsText = await wordsResponse.text();
        const examplesText = await examplesResponse.text();
        const examples = parseExamplesCsv(examplesText)['rows'];
        const words = await Promise.all(
          parseWordsCsv(wordsText)['rows'].map<Promise<WordEntity[number]>>(async (row) => {
            const exists = await isWordExists(row.id);
            const { example, translation } = examples.find((example) => example.id === row.id)!;

            return { ...row, exists, example, translation };
          })
        );

        setData(words);
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
