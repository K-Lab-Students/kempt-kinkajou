import styles from './dashboard.module.scss';
import {
  AgregatorCreateForm,
  AgregatorTable, PotantialProblemeSensorsTable,
  SensorsHumidityGraph, SensorsLuminGraph,
  SensorsTemperatureGraph, SensorsVebrationsGraph
} from "@weather-platform/ui-modules";
import {BaseLayout} from "@weather-platform/layout";
import {useEffect, useState} from "react";
import {Prisma, Measures} from "@weather-platform/prisma-clients/Measures";
import axios from "axios";
import {AGW_URL} from "../../../../agw";
import {SensorsOnMap} from "@weather-platform/ui";

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {

  const fetchGetMeasuresList = async (params: Prisma.MeasuresFindManyArgs = {}) => {
    try {
      const response = await axios.post( AGW_URL + '/api/v1/measures/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [dataTemperature, setDataTemperature] = useState<Measures[]>([]);
  const [dataHumidity, setDataHumidity] = useState<Measures[]>([]);
  const [dataBright, setDataBright] = useState<Measures[]>([]);
  const [dataVibration, setDataVibration] = useState<Measures[]>([]);

  const updateMeasureTmpData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        type: 'temperature',
      },
      take: 120,
      orderBy: {
        time: 'desc',
      },
      select: {
        type: true,
        value: true,
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
      },
      take: 120,
      orderBy: {
        time: 'desc',
      },
      select: {
        type: true,
        value: true,
      }
    });
    if (response !== null) {
      setDataHumidity(response);
    }
  };

  const updateMeasureBrightData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        type: 'brighness',
      },
      take: 120,
      orderBy: {
        time: 'desc',
      },
      select: {
        type: true,
        value: true,
      }
    });
    if (response !== null) {
      setDataBright(response);
    }
  };

  const updateMeasureVibrationData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        type: 'vibration',
      },
      take: 120,
      orderBy: {
        time: 'desc',
      },
      select: {
        type: true,
        value: true,
      }
    });
    if (response !== null) {
      setDataVibration(response);
    }
  };

  function upd() {
    updateMeasureTmpData();
    updateMeasureHumidityData();
    updateMeasureBrightData();
    updateMeasureVibrationData();
  }

  useEffect(() => {
    upd();
    const interval = setInterval(upd, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseLayout>
      <div className={'w-full h-full'}>
          <div className="flex space-x-2 w-full h-[40%]">
          <div className="w-2/3">
            <SensorsOnMap/>
          </div>
          <div className="w-1/3">
            <SensorsVebrationsGraph data={dataVibration}/>
          </div>
        </div>
        <div className="flex px-4 space-x-2 my-4 py-2 w-full">
          <SensorsTemperatureGraph data={dataTemperature}/>
          <SensorsHumidityGraph data={dataHumidity}/>
          <SensorsLuminGraph data={dataBright}/>
        </div>
        <PotantialProblemeSensorsTable/>
      </div>
    </BaseLayout>
  );
}

export default Dashboard;
