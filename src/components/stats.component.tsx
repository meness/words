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
    <Card className="from-secondary-100 to-secondary-200 aspect-square w-[240px] border-none bg-gradient-to-br">
      <CardBody className="items-center justify-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-36 aspect-square h-full drop-shadow-md',
            indicator: 'stroke-foreground',
            track: 'stroke-foreground/10',
            value: 'text-3xl font-semibold text-foreground'
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={value}
        />
      </CardBody>
      <CardFooter className="items-center justify-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-foreground/30',
            content: 'text-foreground/90 text-small font-semibold'
          }}
          variant="bordered">
          {children}
        </Chip>
      </CardFooter>
    </Card>
  </Skeleton>
);
