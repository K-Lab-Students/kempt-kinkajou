import styles from './sensors-humidity-graph.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sensors Humidity Graph",
    },
  },
};

interface DataPoint {
  time: string;
  value: string;
}

/* eslint-disable-next-line */
export interface SensorsHumidityGraphProps {
  data: DataPoint[];
}

export function SensorsHumidityGraph(props: SensorsHumidityGraphProps) {
  const labels = props.data.map(item => parseInt(item.time));
  const Humidities = props.data.map(item => parseInt(item.value));
  Humidities.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: Humidities,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className={'w-1/3 '}>
      <div className={'p-4 bg-white shadow-lg rounded-xl ring-1 ring-gray-100'}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default SensorsHumidityGraph;
