import styles from './sensors-vebrations-graph.module.scss';
import {Line} from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sensors Vibration Graph",
    },
  },
};

interface DataPoint {
  time: string;
  value: string;
}

/* eslint-disable-next-line */
export interface SensorsVebrationsGraphProps {
  data: DataPoint[];
}

export function SensorsVebrationsGraph(props: SensorsVebrationsGraphProps) {
  const labels = props.data.map(item => parseInt(item.time));
  const vibrations = props.data.map(item => parseInt(item.value));
  vibrations.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Vibration",
        data: vibrations,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={'w-full h-full '}>
      <div className={'p-4 bg-white shadow-lg rounded-xl ring-1 ring-gray-100'}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default SensorsVebrationsGraph;
