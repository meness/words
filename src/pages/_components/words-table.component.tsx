import { Checkbox } from '@nextui-org/checkbox';
import { getKeyValue } from '@nextui-org/shared-utils';
import { Spinner } from '@nextui-org/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useMemo, useState } from 'react';
import { ParsedWordsCsv } from '~common/types';
import { isWordLearned, learnWord } from '~helpers';

const columns = [
  { key: 'index', label: '#' },
  { key: 'checkbox', label: '✅' },
  { key: 'word', label: 'کلمه' },
  { key: 'pronunciation', label: 'تلفظ' },
  { key: 'translation', label: 'معنای حقوقی' },
  { key: 'description', label: 'توضیح' }
];

type WordsTableProps = {
  words: ParsedWordsCsv | undefined;
  page: number;
  rowsPerPage: number;
  query: string;
  isLoading: boolean;
};

export const WordsTable = ({ words, page, rowsPerPage, query, isLoading }: WordsTableProps) => {
  const [reRenderTable, setReRenderTable] = useState(Math.random());

  const filteredWords = useMemo(() => {
    if (!words?.rows.length) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    setReRenderTable(Math.random());

    return query.length
      ? words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).slice(start, end)
      : words.rows.slice(start, end);
  }, [query, words?.rows.length, page]);

  return (
    <Table
      shadow="none"
      isStriped
      key={reRenderTable}
      align="center"
      isHeaderSticky
      classNames={{ base: 'min-h-[520px] max-h-[520px]', thead: 'select-none' }}>
      <TableHeader columns={columns}>
        {({ key, label }) => (
          <TableColumn
            key={key}
            align={['checkbox', 'pronunciation', 'index'].includes(key) ? 'center' : 'start'}
            dir={['pronunciation', 'word'].includes(key) ? 'ltr' : 'rtl'}>
            {key === 'checkbox' ? (
              <Checkbox
                size="lg"
                name="check-all"
                id="check-all"
                color="primary"
                isDisabled
              />
            ) : (
              label
            )}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent="متاسفانه نتیجه‌ای وجود ندارد!"
        items={filteredWords}>
        {(item) => (
          <TableRow key={item.word}>
            {(columnKey) => {
              const isCheckboxColumn = columnKey === 'checkbox';
              const isWordColumn = columnKey === 'word';

              return (
                <TableCell
                  align={['checkbox', 'index'].includes(String(columnKey)) ? 'center' : isWordColumn ? 'left' : 'right'}
                  dir={isWordColumn ? 'ltr' : 'rtl'}>
                  {isCheckboxColumn ? (
                    <Checkbox
                      size="lg"
                      color="success"
                      name="check"
                      id="check"
                      defaultSelected={isWordLearned(item.word)}
                      onValueChange={(isSelected) => learnWord(item.word, isSelected)}
                    />
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
