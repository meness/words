import { WordCsv } from '~common/types/word-csv.type';

export const parseWordsCsv = (data: string): WordCsv => {
  const splittedRows = data.split('\n').map((row) => row.split(','));
  const headers = splittedRows[0];
  const rows = splittedRows.slice(1).map<WordCsv['rows'][number]>((row, index) => ({
    word: row[0],
    pronunciation: row[1],
    meaning: row[2],
    description: row[3],
    example: row[4],
    translation: row[5],
    id: index + 1
  }));

  return {
    headers,
    rows
  };
};
