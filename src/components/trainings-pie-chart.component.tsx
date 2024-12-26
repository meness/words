import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useTrainingsPieChartData } from '~hooks/use-trainings-pie-chart-data.hook';

const colors = ['hsl(var(--nextui-primary-500))', 'hsl(var(--nextui-default-200))'];

export const TrainingPieChart = () => {
  const data = useTrainingsPieChartData();

  return (
    <ResponsiveContainer
      width={300}
      aspect={1}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          strokeWidth={0}
          className="focus:outline-none"
          innerRadius="40%">
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
