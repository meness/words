import type { ParsedCsv } from '~common/types';

export const parseCsv = (data: string): ParsedCsv => {
  const splittedRows = data.split('\r\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map((row) => ({
    checkbox: row[0],
    word: row[1],
    pronunciation: row[2],
    translation: row[3],
    description: row[4]
  }));

  return {
    headers,
    rows
  };
};
