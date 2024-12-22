export type ParsedWordsCsv = {
  headers: string[];
  rows: {
    word: string;
    pronunciation: string;
    translation: string;
    description: string;
    id: number;
  }[];
};
