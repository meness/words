import type { ExampleCsv, WordCsv } from '~common/types';

export const parseWordsCsv = (data: string): WordCsv => {
  const splittedRows = data.split('\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map<WordCsv['rows'][number]>((row, index) => ({
    word: row[0],
    pronunciation: row[1],
    meaning: row[2],
    description: row[3],
    id: index + 1
  }));

  return {
    headers,
    rows
  };
};

export const parseExamplesCsv = (data: string): ExampleCsv => {
  const splittedRows = data.split('\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map<ExampleCsv['rows'][number]>((row, index) => ({
    word: row[0],
    example: row[1],
    translation: row[2],
    id: index + 1
  }));

  return {
    headers,
    rows
  };
};
