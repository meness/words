import type { ParsedExamplesCsv, ParsedWordsCsv } from '~common/types';

export const parseWordsCsv = (data: string): ParsedWordsCsv => {
  const splittedRows = data.split('\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map((row, index) => ({
    checkbox: row[0],
    word: row[1],
    pronunciation: row[2],
    translation: row[3],
    description: row[4],
    index: index + 1
  }));

  return {
    headers,
    rows
  };
};

export const parseExamplesCsv = (data: string): ParsedExamplesCsv => {
  const splittedRows = data.split('\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map((row, index) => ({
    checkbox: row[0],
    word: row[1],
    example: row[2],
    translation: row[3],
    index: index + 1
  }));

  return {
    headers,
    rows
  };
};
