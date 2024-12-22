import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import { useDisclosure } from '@nextui-org/modal';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { trainOptions } from '~common/consts';
import { TRAIN } from '~common/enums';
import { TrainModal, WordsTable, WordsTablePagination } from '~components';
import { appConfig } from '~configs';
import { useWords } from '~hooks';
import { FullscreenLayout } from '~layouts';

const IndexPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [reRenderTable, setReRenderTable] = useState(Math.random());
  const [selectedTrainOption, setSelectedTrainOption] = useState<[TRAIN]>([TRAIN.SCRATCH]);
  const { isLoading, words } = useWords();

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
        classNames={{ base: 'max-w-5xl select-none', body: 'flex-col sm:flex-row gap-2' }}
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
            <Button
              onPress={onOpenChange}
              className="w-full sm:w-full">
              تمرین&nbsp;{trainOptions[selectedTrainOption[0]].label}
            </Button>
            <Dropdown
              placement="bottom-end"
              classNames={{ base: 'select-none' }}>
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
                selectedKeys={selectedTrainOption}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setSelectedTrainOption([key.currentKey as TRAIN]);
                }}>
                {Object.values(trainOptions).map(({ key, description, label }) => (
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
      <TrainModal
        selectedTrainOption={selectedTrainOption}
        isOpen={isOpen}
        onClose={onClose}
        words={words}
        onNextWord={() => {
          if (selectedTrainOption[0] !== TRAIN.LEARNED) {
            setReRenderTable(Math.random());
          }
        }}
      />
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
