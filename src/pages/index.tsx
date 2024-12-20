import { Card, CardBody } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import type { ParsedCsv } from '~common/types';
import { isWordLearned, learnWord, parseCsv } from '~helpers';
import { FullscreenLayout } from '~layouts';

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
  const [query, setQuery] = useState('');
  const [words, setWords] = useState<ParsedCsv>();
  const [_, setExamples] = useState<ParsedCsv>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      setIsLoading(true);

      await fetch('/assets/csv/words.csv', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('fuck data', data);
          console.log('fuck parsed', parseCsv(data));
          setWords(parseCsv(data));
        })
        .catch((error) => console.error('Error fetching words.csv:', error));

      await fetch('/assets/csv/examples.csv', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('fuck data', data);
          console.log('fuck parsed', parseCsv(data));
          setExamples(parseCsv(data));
        })
        .catch((error) => console.error('Error fetching examples.csv:', error));

      setIsLoading(false);
    };

    fetchCsvFiles();
  }, []);

  const filteredWords = useMemo<ParsedCsv['rows']>(() => {
    if (!query.trim() || !words?.rows.length) {
      return [];
    }

    return words.rows.filter((word) => word.word.toLowerCase().includes(query.toLowerCase()));
  }, [query, words]);

  return (
    <div className="my-10 flex flex-col place-content-center place-items-center gap-6">
      <Input
        type="search"
        id="search-input"
        onChange={(e) => setQuery(e.target.value.trim())}
        value={query}
        placeholder="کلمات را جستجو کنید..."
        classNames={{ base: 'max-w-4xl' }}
        disabled={!words?.rows.length}
      />
      <Card
        fullWidth
        classNames={{ base: 'max-w-4xl' }}>
        <CardBody>
          <Table
            shadow="none"
            isStriped
            removeWrapper
            isHeaderSticky
            classNames={{ base: 'min-h-[520px] max-h-[520px] overflow-y-auto' }}>
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

                return <TableColumn key={column.key}>{column.label}</TableColumn>;
              }}
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner />}
              emptyContent="متاسفانه نتیجه‌ای وجود ندارد!"
              items={query ? filteredWords : (words?.rows ?? [])}>
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

                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
