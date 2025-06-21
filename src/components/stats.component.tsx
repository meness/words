import { Card, CardBody, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { CircularProgress, CircularProgressProps } from '@heroui/progress';
import { Skeleton } from '@heroui/skeleton';
import { PropsWithChildren } from 'react';

type StatsProps = PropsWithChildren<Pick<CircularProgressProps, 'value'> & { isLoading: boolean }>;

export const Stats = ({ isLoading, value, children }: StatsProps) => (
  <Skeleton
    isLoaded={!isLoading}
    classNames={{ base: 'rounded-large w-fit before:w-fit' }}>
    <Card
      classNames={{
        base: 'aspect-square w-[240px] border-none bg-gradient-to-br from-primary-50 to-primary-100',
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
          value={value}
        />
      </CardBody>
      <CardFooter>
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-small font-semibold'
          }}
          variant="bordered">
          {children}
        </Chip>
      </CardFooter>
    </Card>
  </Skeleton>
);
