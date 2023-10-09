import styles from './sensors-temperature-graph.module.scss';
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
      text: "Sensors Temperature Graph",
    },
  },
};

interface DataPoint {
  time: string;
  value: string;
}

/* eslint-disable-next-line */
export interface SensorsTemperatureGraphProps {
  data: DataPoint[];
}

export function SensorsTemperatureGraph(props: SensorsTemperatureGraphProps) {

  const labels = props.data.map(item => parseInt(item.time));
  const temperatures = props.data.map(item => parseInt(item.value));
  temperatures.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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

export default SensorsTemperatureGraph;
