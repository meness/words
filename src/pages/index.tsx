import { Card, CardBody } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { Pagination } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import type { ParsedCsv } from '~common/types';
import { isWordLearned, learnWord, parseCsv } from '~helpers';
import { FullscreenLayout } from '~layouts';

const rowsPerPage = 50;
const columns = [
  {
    key: 'checkbox',
    label: '✅'
  },
  {
    key: 'word',
    label: 'کلمه'
  },
  {
    key: 'pronunciation',
    label: 'تلفظ'
  },
  {
    key: 'translation',
    label: 'معنای حقوقی'
  },
  {
    key: 'description',
    label: 'توضیح'
  }
];

const IndexPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [words, setWords] = useState<ParsedCsv>();
  const [_, setExamples] = useState<ParsedCsv>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      setIsLoading(true);

      await fetch('/assets/csv/words.csv')
        .then((response) => response.text())
        .then((data) => setWords(parseCsv(data)))
        .catch((error) => console.error('Error fetching words.csv:', error));

      await fetch('/assets/csv/examples.csv')
        .then((response) => response.text())
        .then((data) => setExamples(parseCsv(data)))
        .catch((error) => console.error('Error fetching examples.csv:', error));

      setIsLoading(false);
    };

    fetchCsvFiles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const filteredWords = useMemo<ParsedCsv['rows']>(() => {
    if (!words?.rows.length) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (query.length) {
      return words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).slice(start, end);
    }

    return words.rows.slice(start, end);
  }, [query, words?.rows.length, page]);

  const totalPages = useMemo(() => {
    if (!words?.rows.length) {
      return 1;
    }

    if (query.length) {
      return Math.ceil(
        words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).length / rowsPerPage
      );
    }

    return Math.ceil(words.rows.length / rowsPerPage);
  }, [
    words?.rows.length,
    query.length
  ]);

  return (
    <div className="my-10 flex flex-col place-content-center place-items-center gap-6">
      <Input
        type="search"
        id="search-input"
        onChange={(e) => setQuery(e.target.value.trim())}
        value={query}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={false}
        placeholder="کلمات را جستجو کنید..."
        classNames={{ base: 'max-w-5xl' }}
        disabled={!words?.rows.length}
      />
      <Card
        fullWidth
        classNames={{ base: 'max-w-5xl' }}>
        <CardBody>
          <Table
            shadow="none"
            isStriped
            align="center"
            removeWrapper
            isHeaderSticky
            classNames={{ base: 'min-h-[520px] max-h-[520px]' }}>
            <TableHeader columns={columns}>
              {(column) => {
                if (column.key === 'checkbox') {
                  return (
                    <TableColumn
                      key={column.key}
                      align="center">
                      <Checkbox
                        size="lg"
                        name="check-all"
                        id="check-all"
                        color="primary"
                        isDisabled
                      />
                    </TableColumn>
                  );
                }

                if (column.key === 'pronunciation') {
                  return (
                    <TableColumn
                      key={column.key}
                      dir="ltr"
                      align="center">
                      {column.label}
                    </TableColumn>
                  );
                }

                if (column.key === 'word') {
                  return (
                    <TableColumn
                      key={column.key}
                      dir="ltr"
                      align="start">
                      {column.label}
                    </TableColumn>
                  );
                }

                return (
                  <TableColumn
                    align="start"
                    key={column.key}>
                    {column.label}
                  </TableColumn>
                );
              }}
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner />}
              emptyContent="متاسفانه نتیجه‌ای وجود ندارد!"
              items={filteredWords}>
              {(item) => (
                <TableRow key={item.word}>
                  {(columnKey) => {
                    if (columnKey === 'checkbox') {
                      return (
                        <TableCell align="center">
                          <Checkbox
                            size="lg"
                            color="success"
                            name="check"
                            id="check"
                            defaultSelected={isWordLearned(item.word)}
                            onValueChange={(isSelected) => {
                              learnWord(item.word, isSelected);
                            }}
                          />
                        </TableCell>
                      );
                    }

                    if (columnKey === 'word') {
                      return (
                        <TableCell
                          align="left"
                          dir="ltr">
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      );
                    }

                    return <TableCell align="right">{getKeyValue(item, columnKey)}</TableCell>;
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Pagination
            isCompact
            showControls
            color="secondary"
            page={page}
            initialPage={1}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </CardBody>
      </Card>
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
