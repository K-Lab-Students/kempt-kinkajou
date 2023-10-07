import styles from './sensors-table-item.module.scss';
import {Sensor, Prisma as PrismaSensors} from "@weather-platform/prisma-clients/Sensors";
import axios from "axios";
import {useEffect, useState} from "react";
import {Measures, Prisma as PrismaMeasures} from "@weather-platform/prisma-clients/Measures";

/* eslint-disable-next-line */
export interface SensorsTableItemProps {
  sensor: Sensor,
}

export function SensorsTableItem(props: SensorsTableItemProps) {

  const fetchGetMeasuresList = async (params: PrismaMeasures.MeasuresFindManyArgs = {}) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/measures/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [lastTmp, setLastTmp] = useState<Measures[]>([]);
  const [lastHumidity, setLastHumidity] = useState<Measures[]>([]);

  const updateMeasureTmpData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        sensor_uuid: props.sensor.uuid,
        type: 'temperature',
      },
      orderBy: {
        time: "desc",
      },
      take: 1,
    });
    if (response !== null) {
      setLastTmp(response);
    }
  };

  const updateMeasureHumidityData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        sensor_uuid: props.sensor.uuid,
        type: 'humidity',
      },
      orderBy: {
        time: "desc",
      },
      take: 1,
    });
    if (response !== null) {
      setLastHumidity(response);
    }
  };

  function upd() {
    updateMeasureTmpData();
    updateMeasureHumidityData();
  }

  useEffect(() => {
    upd();
    const interval = setInterval(upd, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">
            { props.sensor.name }
          </p>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          { props.sensor.lat }, { props.sensor.lng }
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          <span
            className="relative inline-block px-3 py-1 font-semibold leading-tight bg-gray-200 rounded-lg">
              {lastTmp[0]?.value} ° / { lastHumidity[0]?.value } % / 1000 L
          </span>
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          { props.sensor.createdAt.toString() }
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span
                                  className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
      </td>
    </tr>
  );
}

export default SensorsTableItem;
