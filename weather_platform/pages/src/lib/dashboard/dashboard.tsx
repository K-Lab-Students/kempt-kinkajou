import styles from './dashboard.module.scss';
import {
  AgregatorCreateForm,
  AgregatorTable,
  SensorsHumidityGraph,
  SensorsTemperatureGraph
} from "@weather-platform/ui-modules";
import {BaseLayout} from "@weather-platform/layout";
import {useEffect, useState} from "react";
import {Prisma, Measures} from "@weather-platform/prisma-clients/Measures";
import axios from "axios";

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {

  const fetchGetMeasuresList = async (params: Prisma.MeasuresFindManyArgs = {}) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/measures/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [dataTemperature, setDataTemperature] = useState<Measures[]>([]);
  const [dataHumidity, setDataHumidity] = useState<Measures[]>([]);

  const updateMeasureTmpData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        type: 'temperature',
      }
    });
    if (response !== null) {
      setDataTemperature(response);
    }
  };

  const updateMeasureHumidityData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        type: 'humidity',
      }
    });
    if (response !== null) {
      setDataHumidity(response);
    }
  };

  function upd() {
    updateMeasureTmpData();
    updateMeasureHumidityData();
  }

  useEffect(() => {
    upd();
    const interval = setInterval(upd, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseLayout>
      <div className="flex px-4 py-2 w-full">
        <SensorsTemperatureGraph data={dataTemperature}/>
        <SensorsHumidityGraph data={dataHumidity}/>
      </div>
    </BaseLayout>
  );
}

export default Dashboard;
