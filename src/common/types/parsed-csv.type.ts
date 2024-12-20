export type ParsedCsv = {
  headers: string[];
  rows: {
    checkbox: string;
    word: string;
    pronunciation: string;
    translation: string;
    description: string;
  }[];
};
