import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis } from 'recharts';
import { useExamsLineChartData } from '~hooks';

export const ExamsLineChart = () => {
  const data = useExamsLineChartData();

  return (
    <ComposedChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
      <CartesianGrid
        strokeDasharray="3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <XAxis
        dataKey="month"
        hide
      />
      <Tooltip />
      <Bar
        dataKey="total"
        barSize={20}
        fill="hsl(var(--nextui-primary-500))"
        name="آزمون‌ها"
      />
      <Line
        type="monotone"
        dataKey="mistakes"
        stroke="hsl(var(--nextui-danger-500))"
        name="جواب‌های اشتباه"
      />
      <Line
        type="monotone"
        dataKey="accuracies"
        stroke="hsl(var(--nextui-success-500))"
        name="جواب‌های درست"
      />
    </ComposedChart>
  );
};
