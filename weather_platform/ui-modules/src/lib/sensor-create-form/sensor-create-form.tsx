import styles from './sensor-create-form.module.scss';
import {useEffect, useState} from "react";
import {Agregator, Prisma} from "@weather-platform/prisma-clients/Agregators";
import axios from "axios";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AgregatorCreateDTOClass} from "../../../../apps/agregators-service/src/DTO/AgregatorCreateDTOClass.dto";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {SensorCreateDTOClass} from "../../../../apps/sensors-service/src/DTO/SensorCreateDTOClass.dto";
import {MeasuresCreateDTOClass} from "../../../../apps/agw/src/measures/DTO/CreateMeasuresClass.dto";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";

/* eslint-disable-next-line */
export interface SensorCreateFormProps {}

export function SensorCreateForm(props: SensorCreateFormProps) {

  const [name, setName] = useState<string>("");
  const [letV, setLet] = useState<string>("");
  const [lngV, setLng] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [agregator, setAgregator] = useState<Agregator|null>();
  const [agregators, setAgregators] = useState<Agregator[] | null>([]);

  const [isSelectAgregator, setIsSelectAgregator] = useState<boolean>(false);

  // todo: incapsulate this function
  const fetchGetAgregatorsList = async (params: Prisma.AgregatorFindManyArgs = {}) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/agregator/get-with-params', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const updateAgregatorsData = async () => {
    const response = await fetchGetAgregatorsList({
      select: {
        uuid: true,
        name: true,
      }
    });
    if (response !== null) {
      setAgregators(response);
    }
  };

  useEffect(() => {
    updateAgregatorsData();
    const interval = setInterval(updateAgregatorsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCreateSensor = async (params: SensorCreateDTOClass) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/sensors/create', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  function create() {
    if (agregator === null) {
      return;
    }

    const data: SensorCreateDTOClass = {
      name: name,
      lat: letV,
      lng: lngV,
      height: height,
      sendedInDate: "1234",
      creatorUUID: "1",
      agregator_uuid: agregator?.uuid || "",
    }
    const res = fetchCreateSensor(data);
    setLng("");
    setHeight(0);
    setLet("");
    setName("");
    setAgregator(null);
  }

  const fetchCreateMeasure = async (params: MeasuresCreateDTOClass) => {
    try {
      const response = await axios.post( 'http://localhost:8045/api/v1/measures/register', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  function rendomPackagesSend() {
    const data: MeasuresCreateDTOClass = {
      sendedInDate: "1234",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      measuresDataList: [
        {
          uuid: "1",
          agregator_uuid: agregator?.uuid || "",
          sensor_uuid: "3e184570-40d5-419e-a1eb-2c4be239e277",
          msg_type: "temperature",
          msg_value: (Math.floor(Math.random() * (35 - 11 + 1)) + 11).toString(), // random number from 11 to 35
          sendedInDate: "1234",
          math_time: Date.now().toString(),
        },
        {
          uuid: "2",
          agregator_uuid: agregator?.uuid || "",
          sensor_uuid: "3e184570-40d5-419e-a1eb-2c4be239e277",
          msg_type: "humidity",
          msg_value: (Math.floor(Math.random() * (80 - 11 + 1)) + 11).toString(), // random number from 80 to 35
          sendedInDate: "1234",
          math_time: Date.now().toString(),
        }
      ]
    }
    const res = fetchCreateMeasure(data);
  }

  return (
    <div className={'w-1/4 bg-blue-100 rounded-2xl ring-1 shadow-sm h-full p-4 space-y-4'}>
      <h1 className={'text-center font-bold text-2xl'}>Register Sensor</h1>



      <div className=" relative ">
        <label htmlFor="adapter-name" className="text-gray-700">
          Name
        </label>
        <input type="text" id="adapter-name" onChange={(e) => setName(e.currentTarget.value)}
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="name" placeholder="Sensor name"/>
      </div>


      <div className="w-full">
        <label htmlFor="agregator">Select agregator</label>
        <div className="relative mt-1">
          <button type="button" onClick={() => setIsSelectAgregator(!isSelectAgregator)}
                  className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="flex items-center">
                <span className="block ml-3 truncate">
                    {agregator?.name || "Select agregator"}
                </span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd">
                    </path>
                </svg>
            </span>
          </button>
          {
            (isSelectAgregator) && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                <ul role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3"
                    className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {
                    (agregators !== null && isSelectAgregator) && agregators.map((agregator) => {
                      return (
                        <li role="option" onClick={() => {
                          setAgregator(agregator);
                          setIsSelectAgregator(false);
                        }}
                            className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9">
                          <div className="flex items-center">
                        <span className="block ml-3 font-normal truncate">
                            {agregator.name}
                        </span>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>


      <div className="flex space-x-2 w-full">
        <div className=" relative ">
          <label htmlFor="adapter-let" className="text-gray-700">
            let
          </label>
          <input type="text" id="adapter-let" onChange={(e) => setLet(e.currentTarget.value)}
                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                 name="let" placeholder="Sensor let"/>
        </div>
        <div className=" relative ">
          <label htmlFor="adapter-lng" className="text-gray-700">
            lng
          </label>
          <input type="text" id="adapter-lng" onChange={(e) => setLng(e.currentTarget.value)}
                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                 name="lng" placeholder="Sensor lng"/>
        </div>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-height" className="text-gray-700">
          Height
        </label>
        <input type="text" id="adapter-height"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="height" placeholder="Sensor height"/>
      </div>


      <button type="button" onClick={() => create()} className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        Create
      </button>

      <button type="button" onClick={() => rendomPackagesSend()} className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        Generate Random Data (for test)
      </button>

    </div>
  );
}

export default SensorCreateForm;
