import styles from './sensors-table.module.scss';
import {Sensor, Prisma} from "@weather-platform/prisma-clients/Sensors";
import axios from "axios";
import {useEffect, useState} from "react";
import AgregatorTableItem from "../agregator-table-item/agregator-table-item";
import SensorsTableItem from "../sensors-table-item/sensors-table-item";

/* eslint-disable-next-line */
export interface SensorsTableProps {}

export function SensorsTable(props: SensorsTableProps) {

  const fetchGetSensorsList = async (params: Prisma.SensorFindManyArgs = {}) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/sensors/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [sensors, setSensors] = useState<Sensor[] | null>(null);

  const updateSensorsData = async () => {
    const response = await fetchGetSensorsList({
      select: {
        uuid: true,
        name: true,
        createdAt: true,
      }
    });
    if (response !== null) {
      setSensors(response);
    }
  };

  useEffect(() => {
    updateSensorsData();
    const interval = setInterval(updateSensorsData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8 px-4">
      <h1 className={'text-center font-bold text-2xl'}>Agregators</h1>
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
            <tr>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Name
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Coordinates
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Last data (tm, H, l)
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Created at
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                status
              </th>
            </tr>
            </thead>
            <tbody>
            {
              sensors?.map(
                (sensors, key) => <SensorsTableItem sensor={sensors} key={key}/>
              )
            }
            {
              sensors?.length === 0 && <p>Notion not found</p>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SensorsTable;
