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
  { key: 'checkbox', label: '✅' },
  { key: 'word', label: 'کلمه' },
  { key: 'pronunciation', label: 'تلفظ' },
  { key: 'translation', label: 'معنای حقوقی' },
  { key: 'description', label: 'توضیح' }
];

const IndexPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [words, setWords] = useState<ParsedCsv>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);

        const wordsResponse = await fetch('/assets/csv/words.csv');
        const wordsData = await wordsResponse.text();

        setWords(parseCsv(wordsData));
      } catch {
        setError('Failed to load words data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvFiles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const filteredWords = useMemo(() => {
    if (!words?.rows.length) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return query.length
      ? words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).slice(start, end)
      : words.rows.slice(start, end);
  }, [query, words?.rows.length, page]);

  const totalPages = useMemo(() => {
    if (!words?.rows.length) {
      return 1;
    }

    const filteredCount = query.length
      ? words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).length
      : words.rows.length;

    return Math.ceil(filteredCount / rowsPerPage);
  }, [words?.rows.length, query.length]);

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
              {({ key, label }) => (
                <TableColumn
                  key={key}
                  align={['checkbox', 'pronunciation'].includes(key) ? 'center' : 'start'}
                  dir={key === 'word' || key === 'pronunciation' ? 'ltr' : 'auto'}>
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
              emptyContent={
                !!error ? <div className="text-red-500">{error}</div> : <div>متاسفانه نتیجه‌ای وجود ندارد!</div>
              }
              items={filteredWords}>
              {(item) => (
                <TableRow key={item.word}>
                  {(columnKey) => {
                    const isCheckboxColumn = columnKey === 'checkbox';
                    const isWordColumn = columnKey === 'word';

                    return (
                      <TableCell
                        align={isCheckboxColumn ? 'center' : isWordColumn ? 'left' : 'right'}
                        dir={isWordColumn ? 'ltr' : 'auto'}>
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
            onChange={(newPage) => setPage(newPage)}
          />
        </CardBody>
      </Card>
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
