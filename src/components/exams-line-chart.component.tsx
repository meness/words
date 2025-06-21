import { Alert } from '@heroui/alert';
import { Chip, ChipProps } from '@heroui/chip';
import { Tooltip as NextTooltip } from '@heroui/tooltip';
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useExamsLineChartData } from '~hooks/use-exams-line-chart-data.hook';
import { formatDecimal } from '~utils/number.util';

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

  if (!data.length) {
    return (
      <div>
        <Alert
          variant="bordered"
          hideIconWrapper
          classNames={{ description: 'text-info-500', base: 'select-none text-info-500 text-right border-info-500' }}
          title="توجه"
          description="هنوز آزمونی انجام ندادید."
        />
      </div>
    );
  }

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
          fill="hsl(var(--heroui-primary-500))"
          name="آزمون"
        />
        <Line
          type="monotone"
          dataKey="mistakes"
          stroke="hsl(var(--heroui-danger-500))"
          name="جواب اشتباه"
        />
        <Line
          type="monotone"
          dataKey="accuracies"
          stroke="hsl(var(--heroui-success-500))"
          name="جواب درست"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
