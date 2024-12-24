import { parseExamplesCsv, parseWordsCsv } from '~helpers';

export const CsvApi = {
  getWords: async () => {
    const response = await fetch('/assets/csv/words.csv');
    const data = await response.text();

    return parseWordsCsv(data);
  },
  getExamples: async () => {
    const response = await fetch('/assets/csv/examples.csv');
    const data = await response.text();

    return parseExamplesCsv(data);
  }
};
