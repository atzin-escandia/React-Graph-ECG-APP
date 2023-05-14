import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ECGChartProps {
  time: number[];
  values: number[][];
}

function ECGChart(props: ECGChartProps) {
  const { time, values } = props;

  const data = time.map((t, i) => ({ time: t, value: values[i][0] }));

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}

export default ECGChart;
