export type ParsedWordsCsv = {
  headers: string[];
  rows: {
    checkbox: string;
    word: string;
    pronunciation: string;
    translation: string;
    description: string;
    index: number;
  }[];
};
