import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Switch } from '@nextui-org/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { PRACTICE } from '~common/enums';
import type { ParsedExamplesCsv, ParsedWordsCsv } from '~common/types';
import { WordsTable, WordsTablePagination } from '~components';
import { appConfig } from '~configs';
import { isWordLearned, learnWord } from '~helpers';
import { useWords } from '~hooks';
import { FullscreenLayout } from '~layouts';

const practiceOption: Record<PRACTICE, { description: string; label: string; key: PRACTICE }> = {
  scratch: { label: 'همه کلمات', description: 'همه کلمات را تمرین کن.', key: PRACTICE.SCRATCH },
  learned: {
    label: 'کلمات تمرین‌شده',
    description: 'کلماتی که قبلا تمرین‌شده را تمرین کن.',
    key: PRACTICE.LEARNED
  },
  left: { label: 'کلمات باقی‌مانده', description: 'کلمات باقی‌مانده را تمرین کن.', key: PRACTICE.LEFT }
};

const IndexPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [practicedWordIndex, setPracticedWordIndex] = useState(0);
  const [practicedWordHint, setPracticedWordHint] = useState(false);
  const [hintAlways, setHintAlways] = useState(false);
  const [reRenderTable, setReRenderTable] = useState(Math.random());
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<[PRACTICE]>([PRACTICE.SCRATCH]);
  const { examples, isLoading, words } = useWords();

  useEffect(() => {
    setPage(1);
  }, [query]);

  const totalPages = useMemo(() => {
    if (!words.length) {
      return 1;
    }

    const filteredCount = query.length
      ? words.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).length
      : words.length;

    return Math.ceil(filteredCount / appConfig.rowsPerPage);
  }, [words.length, query.length]);

  const filteredWords = useMemo(() => {
    if (!words.length) {
      return [];
    }

    const start = (page - 1) * appConfig.rowsPerPage;
    const end = start + appConfig.rowsPerPage;

    setReRenderTable(Math.random());

    return query.length
      ? words.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())).slice(start, end)
      : words.slice(start, end);
  }, [query, words.length, page]);

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
          <ButtonGroup
            variant="shadow"
            isDisabled={isLoading}
            color="primary">
            <Button onPress={onOpenChange}>تمرین&nbsp;{practiceOption[selectedPracticeOption[0]].label}</Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="flat">
                  <FaChevronDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Merge options"
                className="max-w-[300px]"
                selectedKeys={selectedPracticeOption}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setSelectedPracticeOption([key.currentKey as PRACTICE]);
                }}>
                {Object.values(practiceOption).map(({ key, description, label }) => (
                  <DropdownItem
                    key={key}
                    description={description}>
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card
        fullWidth
        classNames={{ base: 'max-w-5xl', body: 'p-0' }}>
        <CardBody>
          <WordsTable
            key={reRenderTable}
            words={filteredWords}
            isLoading={isLoading}
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
            let wordsData: ParsedWordsCsv['rows'] = [];
            let examplesData: ParsedExamplesCsv['rows'] = [];
            if (selectedPracticeOption[0] === PRACTICE.SCRATCH) {
              wordsData = words;
              examplesData = examples;
            } else if (selectedPracticeOption[0] === PRACTICE.LEARNED) {
              wordsData = words.filter((row) => isWordLearned(row.word));
              examplesData = examples.filter((row) => wordsData.some((word) => word.index === row.index));
            } else if (selectedPracticeOption[0] === PRACTICE.LEFT) {
              wordsData = words.filter((row) => !isWordLearned(row.word));
              examplesData = examples.filter((row) => wordsData.some((word) => word.index === row.index));
            }

            const wordsCount = wordsData.length;
            const currentWord = wordsData[practicedWordIndex];
            const example = examplesData[practicedWordIndex];

            return (
              <>
                <ModalHeader className="flex items-center gap-3">
                  <Progress
                    aria-label="Practicing..."
                    className="absolute left-0 right-0 top-0 max-w-full"
                    color="success"
                    showValueLabel={false}
                    size="sm"
                    maxValue={words.length ?? 0}
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
                      endContent={<FaChevronRight />}
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
                      endContent={<FaChevronLeft />}
                      isDisabled={practicedWordIndex + 1 === wordsCount}
                      onPress={() => {
                        if (currentWord) {
                          learnWord(currentWord.word, true);
                          setReRenderTable(Math.random());
                        }
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
