export type ParsedExamplesCsv = {
  headers: string[];
  rows: {
    word: string;
    example: string;
    translation: string;
    id: number;
  }[];
};
