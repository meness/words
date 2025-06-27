'use client';

import { Alert } from '@heroui/alert';
import { Button, ButtonGroup } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/modal';
import { Skeleton } from '@heroui/skeleton';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { IoPieChartOutline } from 'react-icons/io5';
import { PiExam } from 'react-icons/pi';
import { useShallow } from 'zustand/shallow';
import { trainOption } from '~common/consts/train-option.const';
import { TRAIN_TYPE } from '~common/enums/train-type.enum';
import { ExamsLineChart } from '~components/exams-line-chart.component';
import { TrainingPieChart } from '~components/trainings-pie-chart.component';
import { WordsTable } from '~components/words-table.component';
import { app } from '~configs/app.config';
import { changeNoticeAlertVisibility, checkIsNoticeAlertVisible } from '~helpers/storage.helper';
import { useExams } from '~hooks/use-exams.hook';
import { useTrainings } from '~hooks/use-trainings.hook';
import { useWords } from '~hooks/use-words.hook';
import { usePreferences } from '~stores/preferences.store';
import { formatDecimal, formatPercent } from '~utils/number.util';

const TrainModal = dynamic(() => import('~components/train-modal.component').then((module) => module.TrainModal), {
  ssr: false
});

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [isNoticeAlertVisible, setIsNoticeAlertVisible] = useState(false);
  const { isOpen, onClose, onOpenChange } = useDisclosure({ defaultOpen: false });
  const { trainType, setTrainType } = usePreferences(
    useShallow((store) => ({ trainType: store.trainType, setTrainType: store.setTrainType }))
  );
  const { isLoading, data: words } = useWords();
  const trainings = useTrainings();
  const exams = useExams();

  const filteredWords = useMemo(() => {
    if (!words.length) {
      return [];
    }

    return query.length ? words.filter((word) => word.word.toLowerCase().includes(query.toLowerCase())) : words;
  }, [query, words.length]);

  useEffect(() => {
    setIsNoticeAlertVisible(checkIsNoticeAlertVisible());
  }, []);

  const dismissNoticeAlert = () => {
    setIsNoticeAlertVisible(false);
    changeNoticeAlertVisibility(false);
  };

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col place-content-center place-items-center gap-6">
      <Alert
        variant="bordered"
        hideIconWrapper
        hideIcon
        isVisible={isNoticeAlertVisible}
        classNames={{
          title: 'font-bold text-medium',
          base: 'select-none flex gap-2 items-center flex-col sm:flex-row'
        }}
        endContent={
          <Button
            size="sm"
            onPress={dismissNoticeAlert}
            className="w-full sm:w-fit"
            variant="solid">
            متوجه شدم
          </Button>
        }
        description="این ابزار رایگان و ساده کمک می‌کند سریع کلمات انگلیسی بیشتری یاد بگیرید. هدف از ساخت این ابزار افزایش سرعت یادگیری کلمات انگلیسی بیشتر است."
      />
      <Card
        shadow="md"
        radius="lg"
        isDisabled={isLoading}
        className="select-none"
        fullWidth>
        <CardBody className="flex-col gap-2 sm:flex-row">
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
              تمرین&nbsp;{trainOption[trainType].label}
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
                selectedKeys={[trainType]}
                disabledKeys={!trainings.length ? [TRAIN_TYPE.TRAINED] : []}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setTrainType(key.currentKey as TRAIN_TYPE);
                }}>
                {Object.entries(trainOption).map(([key, { description, label }]) => (
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
        shadow="md"
        radius="lg"
        fullWidth
        className="select-none">
        <CardBody className="p-0">
          <WordsTable
            words={filteredWords}
            isLoading={isLoading}
          />
        </CardBody>
        <Divider />
        <Skeleton
          isLoaded={!isLoading}
          classNames={{ base: 'rounded-b-large w-full' }}>
          <CardFooter className="text-tiny flex items-center justify-between select-none">
            <p>
              <span className="font-bold">{formatDecimal(words.length)}</span> کلمه در اختیار شماست.
            </p>
            <Button
              as={Link}
              href={`mailto:${app.developerEmail}`}
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
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-6">
        <Card
          shadow="md"
          radius="lg"
          fullWidth
          className="col-span-full p-1 select-none sm:col-span-2">
          <CardHeader
            as="h4"
            className="text-large flex items-center gap-2 font-bold">
            <IoPieChartOutline className="h-6 w-6 text-blue-500" />
            آمار تمرین‌ها:&nbsp;{formatPercent(trainings.length / words.length)}
          </CardHeader>
          <CardBody>
            <TrainingPieChart />
          </CardBody>
          <Divider />
          <CardFooter className="text-tiny text-default-400 select-none">
            <p>
              <span className="text-foreground font-bold">{formatDecimal(words.length - trainings.length)} کلمه</span>
              &nbsp;باقی مانده است.
            </p>
          </CardFooter>
        </Card>
        <Card
          shadow="md"
          radius="lg"
          fullWidth
          className="col-span-full select-none sm:col-span-4">
          <CardHeader
            as="h4"
            className="text-large flex items-center gap-2 font-bold">
            <PiExam className="h-6 w-6 text-purple-500" />
            پیشرفت آزمون‌ها
          </CardHeader>
          <CardBody>
            <ExamsLineChart />
          </CardBody>
          <Divider />
          <CardFooter className="text-tiny text-default-400 flex items-center justify-between select-none">
            <p>
              <span className="text-foreground font-bold">{formatDecimal(exams.length)} مرتبه</span> تا کنون آزمون
              دادید.
            </p>
          </CardFooter>
        </Card>
      </div>
      <TrainModal
        trainOption={trainType}
        isOpen={isOpen}
        onClose={onClose}
        words={words}
        onTrainOptionChange={(changedTrainOption) => {
          setTrainType(changedTrainOption);
        }}
      />
    </div>
  );
};

export default HomePage;
