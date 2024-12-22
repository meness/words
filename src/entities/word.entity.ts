import { ParsedWordsCsv } from '~common/types';

export type WordEntity = Array<
  ParsedWordsCsv['rows'][number] & {
    exists: boolean;
    example: string;
    translation: string;
  }
>;
