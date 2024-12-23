export const CsvApi = {
  getWords: () => fetch('/assets/csv/words.csv'),
  getExamples: () => fetch('/assets/csv/examples.csv')
};
