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
            onPress={dismissNoticeAlert}
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
                <span className="text-foreground font-bold">{formatDecimal(words.length - trainings.length)}</span>
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
