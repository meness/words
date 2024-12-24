import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { CircularProgress } from '@nextui-org/progress';
import { Skeleton } from '@nextui-org/skeleton';
import { useEffect, useState } from 'react';
import { WordEntity } from '~entities';
import { countWords } from '~helpers';

type StatsProps = { isLoading: boolean; words: WordEntity };

export const Stats = ({ isLoading, words }: StatsProps) => {
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [trainedWords, setTrainedWords] = useState(0);

  useEffect(() => {
    const stats = async () => {
      setIsLoadingStats(true);

      const count = await countWords();

      setTrainedWords(count);
      setIsLoadingStats(false);
    };

    stats();
  }, []);

  return (
    <Skeleton
      isLoaded={!isLoading && !isLoadingStats}
      classNames={{ base: 'rounded-large w-fit' }}>
      <Card
        classNames={{
          base: 'aspect-square w-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500',
          body: 'items-center justify-center pb-0',
          footer: 'items-center justify-center pt-0'
        }}>
        <CardBody>
          <CircularProgress
            classNames={{
              svg: 'w-36 aspect-square h-full drop-shadow-md',
              indicator: 'stroke-white',
              track: 'stroke-white/10',
              value: 'text-3xl font-semibold text-white'
            }}
            showValueLabel={true}
            strokeWidth={4}
            value={(trainedWords * 100) / words.length}
          />
        </CardBody>
        <CardFooter>
          <Chip
            classNames={{
              base: 'border-1 border-white/30',
              content: 'text-white/90 text-small font-semibold'
            }}
            variant="bordered">
            {trainedWords} کلمه تمرین کردید
          </Chip>
        </CardFooter>
      </Card>
    </Skeleton>
  );
};
