import styles from './sensors-lumin-graph.module.scss';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";

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
      text: "Sensors Bright Graph",
    },
  },
};

interface DataPoint {
  time: string;
  value: string;
}


/* eslint-disable-next-line */
export interface SensorsLuminGraphProps {
  data: DataPoint[];
}

export function SensorsLuminGraph(props: SensorsLuminGraphProps) {
  const labels = props.data.map(item => parseInt(item.time));
  const Lumen = props.data.map(item => parseInt(item.value));
  Lumen.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Bright",
        data: Lumen,
        borderColor: 'rgb(255, 165, 0)',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
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

export default SensorsLuminGraph;
