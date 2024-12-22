export type ParsedExamplesCsv = {
  headers: string[];
  rows: {
    checkbox: string;
    word: string;
    example: string;
    translation: string;
    index: number;
  }[];
};
