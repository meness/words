import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Switch } from '@nextui-org/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import type { ParsedExamplesCsv, ParsedWordsCsv } from '~common/types';
import { parseExamplesCsv, parseWordsCsv } from '~helpers';
import { FullscreenLayout } from '~layouts';
import { WordsTablePagination } from './_components/words-table-pagination.component';
import { WordsTable } from './_components/words-table.component';

const rowsPerPage = 50;

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
        isDisabled={isLoading}
        classNames={{ base: 'max-w-5xl select-none', body: 'flex-row gap-2' }}
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
        classNames={{ base: 'max-w-5xl', body: 'p-0' }}>
        <CardBody>
          <WordsTable
            words={words}
            isLoading={isLoading}
            page={page}
            query={query}
            rowsPerPage={rowsPerPage}
          />
        </CardBody>
      </Card>
      <Card classNames={{ base: 'select-none' }}>
        <CardBody>
          <WordsTablePagination
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardBody>
      </Card>
      <Modal
        backdrop="blur"
        placement="bottom-center"
        isOpen={isOpen}
        classNames={{ header: 'select-none' }}
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
                    color="warning"
                    variant="ghost"
                    className="order-1 md:order-1"
                    isDisabled={practicedWordHint || hintAlways}
                    fullWidth
                    onPress={() => {
                      setPracticedWordHint(true);
                    }}>
                    راهنمایی بگیر
                  </Button>
                  <ButtonGroup className="order-2 md:order-1">
                    <Button
                      color="primary"
                      isIconOnly
                      variant="shadow"
                      endContent={<GrNext />}
                      isDisabled={practicedWordIndex === 0}
                      onPress={() => {
                        setPracticedWordIndex((prev) => prev - 1);
                        setPracticedWordHint(false);
                      }}
                    />
                    <Button
                      color="primary"
                      variant="shadow"
                      fullWidth
                      endContent={<GrPrevious />}
                      isDisabled={practicedWordIndex + 1 === wordsCount}
                      onPress={() => {
                        setPracticedWordIndex((prev) => prev + 1);
                        setPracticedWordHint(false);
                      }}>
                      برو کلمه بعدی
                    </Button>
                  </ButtonGroup>
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
