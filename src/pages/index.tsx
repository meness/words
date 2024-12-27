import { Alert } from '@nextui-org/alert';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import { useDisclosure } from '@nextui-org/modal';
import { Skeleton } from '@nextui-org/skeleton';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { IoPieChartOutline } from 'react-icons/io5';
import { PiExam } from 'react-icons/pi';
import { trainOptions } from '~common/consts';
import { TRAIN_TYPE } from '~common/enums';
import { ExamsLineChart, TrainingPieChart, TrainModal, WordsTable } from '~components';
import { appConfig } from '~configs';
import { getIsNoticeAlertVisible, storeIsNoticeAlertVisible } from '~helpers';
import { useExamsQuery, useTrainingsQuery, useWords } from '~hooks';
import { FullscreenLayout } from '~layouts';
import { formatDecimal, formatPercent } from '~utils';

const IndexPage = () => {
  const [query, setQuery] = useState('');
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [trainOption, setTrainOption] = useState<[TRAIN_TYPE]>([TRAIN_TYPE.SCRATCH]);
  const { isLoading, data: words } = useWords();
  const trainings = useTrainingsQuery();
  const exams = useExamsQuery();
  const [isNoticeAlertVisible, setIsNoticeAlertVisible] = useState(false);

  const filteredWords = useMemo(() => {
    if (!words.length) {
      return [];
    }

    return query.length ? words.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())) : words;
  }, [
    query,
    words.length
  ]);

  useEffect(() => {
    setIsNoticeAlertVisible(getIsNoticeAlertVisible());
  }, []);

  const handleDismissNoticeAlert = () => {
    setIsNoticeAlertVisible(false);
    storeIsNoticeAlertVisible(false);
  };

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col place-content-center place-items-center gap-6">
      <Alert
        title="توجه"
        color="primary"
        variant="bordered"
        isVisible={isNoticeAlertVisible}
        classNames={{
          title: 'font-bold text-medium',
          iconWrapper: 'mb-auto text-white',
          base: 'select-none flex items-center'
        }}
        endContent={
          <Button
            color="primary"
            size="sm"
            onPress={handleDismissNoticeAlert}
            variant="solid">
            متوجه شدم
          </Button>
        }
        description="این ابزار رایگان به شما کمک می‌کند دایره لغات انگلیسی خود را تقویت کنید. تمرکز فعلی بر کلمات تخصصی حقوق، به‌ویژه تجارت بین‌الملل و سایر زیرشاخه‌ها است."
      />
      <Card
        isDisabled={isLoading}
        classNames={{ base: 'select-none', body: 'flex-col sm:flex-row gap-2' }}
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
              shouldBlockScroll={false}
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
        classNames={{
          body: 'p-0',
          footer: 'flex select-none items-center justify-between text-tiny'
        }}>
        <CardBody>
          <WordsTable
            words={filteredWords}
            isLoading={isLoading}
          />
        </CardBody>
        <Divider />
        <Skeleton
          isLoaded={!isLoading}
          classNames={{ base: 'rounded-b-large w-full' }}>
          <CardFooter>
            <p>
              <span className="font-bold">{formatDecimal(words.length)}</span> کلمه در اختیار شماست.
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
        </Skeleton>
      </Card>
      <Divider />
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Card
          classNames={{
            base: 'select-none h-fit p-1',
            header: 'text-large font-bold flex items-center gap-2',
            body: 'flex gap-3 flex-row'
          }}>
          <CardHeader>
            <IoPieChartOutline className="h-6 w-6 text-blue-500" />
            آمار تمرین‌ها
          </CardHeader>
          <CardBody>
            <div className="flex flex-col items-start justify-between gap-1">
              <p className="text-2xl font-bold">{formatPercent(trainings.length / words.length)}</p>
              <p className="text-small text-default-400">
                باقی‌مانده&nbsp;
                <span className="font-bold text-foreground">{formatDecimal(words.length - trainings.length)}</span>
                &nbsp;کلمه
              </p>
            </div>
            <TrainingPieChart />
          </CardBody>
        </Card>
        <Card
          fullWidth
          classNames={{
            base: 'select-none max-w-full',
            header: 'text-large font-bold flex items-center gap-2',
            body: 'w-full h-fit',
            footer: 'flex select-none items-center justify-between text-tiny'
          }}>
          <CardHeader>
            <PiExam className="h-6 w-6 text-purple-500" />
            پیشرفت آزمون‌ها
          </CardHeader>
          <CardBody>
            <ExamsLineChart />
          </CardBody>
          <Divider />
          <CardFooter>
            <p>
              <span className="font-bold">{formatDecimal(exams.length)}</span> مرتبه تا کنون آزمون دادید.
            </p>
          </CardFooter>
        </Card>
      </div>
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
