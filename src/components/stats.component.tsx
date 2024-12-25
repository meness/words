import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { CircularProgress } from '@nextui-org/progress';
import { Skeleton } from '@nextui-org/skeleton';
import { Word } from '~common/types';
import { useTrainings } from '~hooks';

type StatsProps = { isLoading: boolean; words: Word[] };

export const Stats = ({ isLoading, words }: StatsProps) => {
  const trainedWords = useTrainings();

  return (
    <Skeleton
      isLoaded={!isLoading}
      classNames={{ base: 'rounded-large w-fit before:w-fit' }}>
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
            value={(trainedWords.length * 100) / words.length}
          />
        </CardBody>
        <CardFooter>
          <Chip
            classNames={{
              base: 'border-1 border-white/30',
              content: 'text-white/90 text-small font-semibold'
            }}
            variant="bordered">
            {trainedWords.length} کلمه تمرین کردید
          </Chip>
        </CardFooter>
      </Card>
    </Skeleton>
  );
};
