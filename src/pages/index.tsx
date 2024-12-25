import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import { useDisclosure } from '@nextui-org/modal';
import Link from 'next/link';
import { useMemo, useState, type ReactElement } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { trainOptions } from '~common/consts';
import { TRAIN_TYPE } from '~common/enums';
import { Stats, TrainModal, WordsTable } from '~components';
import { appConfig } from '~configs';
import { useTrainings, useWords } from '~hooks';
import { FullscreenLayout } from '~layouts';

const IndexPage = () => {
  const [query, setQuery] = useState('');
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [trainOption, setTrainOption] = useState<[TRAIN_TYPE]>([TRAIN_TYPE.SCRATCH]);
  const { isLoading, data: words } = useWords();
  const trainings = useTrainings();

  const filteredWords = useMemo(() => {
    if (!words.length) {
      return [];
    }

    return query.length ? words.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())) : words;
  }, [
    query,
    words.length
  ]);

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
            placeholder="کلمات را جستجو کنید"
            classNames={{ base: 'max-w-5xl' }}
          />
          <ButtonGroup
            variant="shadow"
            isDisabled={isLoading}
            color="primary">
            <Button
              onPress={onOpenChange}
              className="w-full sm:w-full">
              تمرین&nbsp;{trainOptions[trainOption[0]].label}
            </Button>
            <Dropdown
              placement="bottom-end"
              classNames={{ base: 'select-none' }}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="shadow">
                  <FaChevronDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="گزینه‌های تمرین"
                className="max-w-[300px]"
                selectedKeys={trainOption}
                disabledKeys={!trainings.length ? [TRAIN_TYPE.TRAINED] : []}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setTrainOption([key.currentKey as TRAIN_TYPE]);
                }}>
                {Object.entries(trainOptions).map(([key, { description, label }]) => (
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
            words={filteredWords}
            isLoading={isLoading}
          />
        </CardBody>
      </Card>
      <Card
        fullWidth
        classNames={{
          base: 'max-w-5xl select-none',
          body: 'items-center flex justify-center',
          header: 'text-large font-bold',
          footer: 'flex items-center justify-between text-tiny'
        }}>
        <CardHeader>آمار تمرین‌ها را داشته باشید</CardHeader>
        <Divider />
        <CardBody>
          <Stats
            isLoading={isLoading}
            words={words}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <p>
            <span className="font-bold">{words.length}</span> کلمه در اختیار شماست.
          </p>
          <Button
            as={Link}
            href={`mailto:${appConfig.developerEmail}`}
            color="secondary"
            radius="lg"
            size="sm"
            variant="flat">
            درخواست کلمات بیشتر
          </Button>
        </CardFooter>
      </Card>
      <TrainModal
        trainOption={trainOption[0]}
        isOpen={isOpen}
        onClose={onClose}
        words={words}
        onTrainOptionChange={(changedTrainOption) => {
          setTrainOption([changedTrainOption]);
        }}
      />
    </div>
  );
};

IndexPage.getLayout = (page: ReactElement) => <FullscreenLayout>{page}</FullscreenLayout>;

export default IndexPage;
