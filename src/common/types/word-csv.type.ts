export type WordCsv = {
  headers: string[];
  rows: {
    word: string;
    pronunciation: string;
    meaning: string;
    description: string;
    id: number;
  }[];
};
