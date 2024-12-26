import { Chip, ChipProps } from '@nextui-org/chip';
import { Tooltip as NextTooltip } from '@nextui-org/tooltip';
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useExamsLineChartData } from '~hooks';
import { formatDecimal } from '~utils';

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => (
  <NextTooltip
    classNames={{ content: 'p-4', base: 'select-none' }}
    content={
      <div className="flex flex-col space-y-1.5">
        {payload?.map((entry, index) => {
          let color: ChipProps['color'] = 'primary';
          if (entry.dataKey === 'mistakes') {
            color = 'danger';
          } else if (entry.dataKey === 'accuracies') {
            color = 'success';
          }

          return (
            <Chip
              key={`tooltip-item-${index}`}
              color={color}
              radius="sm"
              variant="bordered">
              <strong>{formatDecimal(Number(entry.value))}</strong>&nbsp;{entry.name}
            </Chip>
          );
        })}
      </div>
    }
    color="default"
    placement="right"
    isOpen={active && payload && !!payload.length}>
    <div style={{ display: 'inline-block', padding: '10px' }}>
      {/* Ensures Recharts renders something to trigger Tooltip */}
    </div>
  </NextTooltip>
);

export const ExamsLineChart = () => {
  const data = useExamsLineChartData();

  return (
    <ResponsiveContainer
      width="100%"
      minHeight={400}
      height="100%">
      <ComposedChart
        width={400}
        height={400}
        data={data}>
        <XAxis
          dataKey="month"
          hide
        />
        <YAxis
          dataKey="total"
          hide
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="total"
          barSize={30}
          fill="hsl(var(--nextui-primary-500))"
          name="آزمون"
        />
        <Line
          type="monotone"
          dataKey="mistakes"
          stroke="hsl(var(--nextui-danger-500))"
          name="جواب اشتباه"
        />
        <Line
          type="monotone"
          dataKey="accuracies"
          stroke="hsl(var(--nextui-success-500))"
          name="جواب درست"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
