import { parseExamplesCsv, parseWordsCsv } from '~helpers/csv.helper';

export const CsvService = {
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
