import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Pagination } from '@nextui-org/pagination';
import { Progress } from '@nextui-org/progress';
import { Spinner } from '@nextui-org/spinner';
import { Switch } from '@nextui-org/switch';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import type { ParsedExamplesCsv, ParsedWordsCsv } from '~common/types';
import { isWordLearned, learnWord, parseExamplesCsv, parseWordsCsv } from '~helpers';
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
  const [words, setWords] = useState<ParsedWordsCsv>();
  const [examples, setExamples] = useState<ParsedExamplesCsv>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [practicedWordIndex, setPracticedWordIndex] = useState(0);
  const [practicedWordHint, setPracticedWordHint] = useState(false);
  const [hintAlways, setHintAlways] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        setIsLoading(true);

        const wordsResponse = await fetch('/assets/csv/words.csv');
        const examplesResponse = await fetch('/assets/csv/examples.csv');
        const wordsData = await wordsResponse.text();
        const examplesData = await examplesResponse.text();

        setWords(parseWordsCsv(wordsData));
        setExamples(parseExamplesCsv(examplesData));
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
      <Card
        isDisabled={!words?.rows.length}
        classNames={{ base: 'max-w-5xl', body: 'flex-row gap-2' }}
        fullWidth>
        <CardBody>
          <Input
            type="search"
            id="search-input"
            fullWidth
            onChange={(e) => setQuery(e.target.value.trim())}
            value={query}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="کلمات را جستجو کنید..."
            classNames={{ base: 'max-w-5xl' }}
          />
          <Button
            variant="shadow"
            color="primary"
            onPress={onOpenChange}
            type="button">
            تمرین
          </Button>
        </CardBody>
      </Card>
      <Card
        fullWidth
        classNames={{ base: 'max-w-5xl' }}>
        <CardBody>
          <Table
            shadow="none"
            isStriped
            key={Math.random()}
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
      <Modal
        backdrop="blur"
        placement="bottom-center"
        isOpen={isOpen}
        size="md"
        onClose={() => {
          setPracticedWordIndex(0);
          setPracticedWordHint(false);
          setHintAlways(false);
          onClose();
        }}>
        <ModalContent>
          {() => {
            const wordsCount = words?.rows.length ?? 0;
            const currentWord = words?.rows[practicedWordIndex];
            const example = examples?.rows[practicedWordIndex];

            return (
              <>
                <ModalHeader className="flex items-center gap-3">
                  <Progress
                    aria-label="Practicing..."
                    className="absolute left-0 right-0 top-0 max-w-full"
                    color="success"
                    showValueLabel={false}
                    size="sm"
                    maxValue={words?.rows.length ?? 0}
                    value={practicedWordIndex + 1}
                  />
                  <Switch
                    color="warning"
                    defaultSelected={hintAlways}
                    onValueChange={(isSelected) => {
                      setHintAlways(isSelected);
                    }}
                    size="sm"
                  />
                  <p>
                    تمرین کلمه {practicedWordIndex + 1} از {wordsCount}
                  </p>
                </ModalHeader>
                <ModalBody>
                  <div
                    className="text-center text-4xl"
                    dir="ltr">
                    <p>{currentWord?.word}</p>
                    <p className="text-medium">{currentWord?.pronunciation}</p>
                  </div>
                  <AnimatePresence>
                    {(practicedWordHint || hintAlways) && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="my-2"
                        transition={{ duration: 0.2 }}>
                        <p>
                          <span className="text-gray-500">معنی حقوقی:</span>&nbsp;{currentWord?.translation}
                        </p>
                        <Divider className="my-2" />
                        <p>
                          <span className="text-gray-500">توضیح:</span>&nbsp;{currentWord?.description}
                        </p>
                        <Divider className="my-2" />
                        <p>
                          <span className="text-gray-500">مثال:</span>&nbsp;
                          <span dir="ltr">{example?.example}</span>
                        </p>
                        <Divider className="my-2" />
                        <p>
                          <span className="text-gray-500">ترجمه:</span>&nbsp;{example?.translation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ModalBody>
                <ModalFooter className="flex flex-col gap-4 md:flex-row">
                  <Button
                    color="primary"
                    fullWidth
                    variant="shadow"
                    className="order-2 md:order-1"
                    isDisabled={practicedWordIndex + 1 === wordsCount}
                    onPress={() => {
                      setPracticedWordIndex((prev) => prev + 1);
                      setPracticedWordHint(false);
                    }}>
                    برو کلمه بعدی
                  </Button>
                  <Button
                    color="warning"
                    variant="ghost"
                    className="order-1 md:order-2"
                    isDisabled={practicedWordHint || hintAlways}
                    fullWidth
                    onPress={() => {
                      setPracticedWordHint(true);
                    }}>
                    راهنمایی بگیر
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
