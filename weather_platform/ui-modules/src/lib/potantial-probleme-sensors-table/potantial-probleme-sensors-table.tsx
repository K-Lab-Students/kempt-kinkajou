import styles from './potantial-probleme-sensors-table.module.scss';
import {Measures, Prisma} from "@weather-platform/prisma-clients/Measures";
import axios from "axios";
import {AGW_URL} from "../../../../agw";
import {useEffect, useState} from "react";
import AgregatorTableItem from "../agregator-table-item/agregator-table-item";
import OK from './ok-status.gif';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

/* eslint-disable-next-line */
export interface PotantialProblemeSensorsTableProps {}


ChartJS.register(ArcElement, Tooltip, Legend);


export function PotantialProblemeSensorsTable(
  props: PotantialProblemeSensorsTableProps
) {

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

  const [measures, setMeasures] = useState<Measures[] | null>(null);

  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  const updateMeasureData = async () => {
    const response = await fetchGetMeasuresList({
      where: {
        sensor_uuid: {
          not: {
            in: [],
          },
        },
        time: {
          gte: twoHoursAgo.toISOString(),
        },
      },
    });
    if (response !== null) {
      setMeasures(response);
    }
  };

  const [measuresCount, setMeasuresCount] = useState<number>(0);

  const updateAllMeasureData = async () => {
    const response = await fetchGetMeasuresList({
      select: {
        uuid: true,
      }
    });
    if (response !== null) {
      setMeasuresCount(response.length);
    }
  };

  function upd() {
    updateAllMeasureData();
    updateMeasureData();
  }

  useEffect(() => {
    upd();
    const interval = setInterval(upd, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Fatal', 'Success'],
    datasets: [
      {
        label: '# of Votes',
        data: [measures?.length || 0, measuresCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full px-4">
      <h1 className={'text-center font-bold text-2xl'}>Incorect get data from Sensors</h1>
      <div className="px-4 py-4 sm:-mx-8 sm:px-8 w-full flex space-x-2">
        <div className="inline-block overflow-hidden rounded-lg shadow ring-1 ring-gray-100 w-3/4">
          <table className="min-w-full leading-normal">
            <thead>
            <tr>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Type / Value
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Last connection
              </th>
              <th scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                Sensor
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
              measures?.map(
                (measure, key) => (
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          { measure.type } / { measure.value }
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { measure.time.toString() }
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <span
                          className="relative inline-block px-3 py-1 font-semibold leading-tight bg-gray-200 rounded-lg">
                            { measure.sensor_uuid }
                        </span>
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { measure.createdAt.toString() }
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span
                                  className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        deactive
                                    </span>
                                </span>
                    </td>
                  </tr>
                )
              )
            }
            </tbody>
          </table>
          {
            measures?.length === 0 && <div className={'flex items-center justify-center justify-items-center space-x-2 py-2 w-full'}>
              <img src={OK} className={'h-6 w-6'} alt=""/>
              <p>Notion not found. All sensors working correct!</p>
            </div>
          }
        </div>

        <div className="w-1/4">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}

export default PotantialProblemeSensorsTable;
