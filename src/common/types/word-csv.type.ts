export type WordCsv = {
  headers: string[];
  rows: {
    word: string;
    pronunciation: string;
    meaning: string;
    description: string;
    example: string;
    translation: string;
    tags: string[];
    id: number;
  }[];
};
