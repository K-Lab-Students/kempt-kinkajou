import styles from './agregator-table.module.scss';
import AgregatorTableItem from "../agregator-table-item/agregator-table-item";
import { Agregator, Prisma } from "@weather-platform/prisma-clients/Agregators";
import axios from "axios";
import {useEffect, useState} from "react";
import {AGW_URL} from "../../../../agw";

/* eslint-disable-next-line */
export interface AgregatorTableProps {}

export function AgregatorTable(props: AgregatorTableProps) {

  const fetchGetAgregatorsList = async (params: Prisma.AgregatorFindManyArgs = {}) => {
    try {
      const response = await axios.post( AGW_URL + '/api/v1/agregator/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [agregators, setAgregators] = useState<Agregator[] | null>(null);

  const updateAgregatorsData = async () => {
    const response = await fetchGetAgregatorsList({});
    if (response !== null) {
      setAgregators(response);
    }
  };

  useEffect(() => {
    updateAgregatorsData();
    const interval = setInterval(updateAgregatorsData, 5000);
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
                Sensors
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
              agregators?.map(
                (agregator, key) => <AgregatorTableItem agregator={agregator} key={key}/>
              )
            }
            {
              agregators?.length === 0 && <p>Notion not found</p>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default AgregatorTable;
