import styles from './agregator-create-form.module.scss';
import {Prisma} from "@weather-platform/prisma-clients/Agregators";
import axios from "axios";
import {useState} from "react";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AgregatorCreateDTOClass} from "../../../../apps/agregators-service/src/DTO/AgregatorCreateDTOClass.dto";
import {AGW_URL} from "../../../../agw";

/* eslint-disable-next-line */
export interface AgregatorCreateFormProps {}

export function AgregatorCreateForm(props: AgregatorCreateFormProps) {

  const [name, setName] = useState<string>("");
  const [letV, setLet] = useState<string>("");
  const [lngV, setLng] = useState<string>("");
  const [height, setHeight] = useState<number>(0);

  const fetchCreateAgregator = async (params: AgregatorCreateDTOClass) => {
    try {
      const response = await axios.post( AGW_URL + '/api/v1/agregator/create', params);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  function create() {
    const data: AgregatorCreateDTOClass = {
      name: name,
      lat: letV,
      lng: lngV,
      height: height,
      country: "test",
      region: "test",
      city: "test",
      street: "test",
      sendedInDate: "1234",
      creatorUUID: "1",
    }
    const res = fetchCreateAgregator(data);
    setLng("");
    setHeight(0);
    setLet("");
    setName("");
  }

  return (
    <div className={'w-1/4 bg-blue-100 rounded-2xl ring-1 shadow-sm h-full p-4 space-y-2'}>
      <h1 className={'text-center font-bold text-2xl'}>Create Adapter</h1>
      <div className=" relative ">
        <label htmlFor="adapter-name" className="text-gray-700">
          Name
        </label>
        <input type="text" id="adapter-name" onChange={(e) => setName(e.currentTarget.value)}
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="name" placeholder="Adapter name"/>
      </div>

      <div className="flex space-x-2 w-full">
        <div className=" relative ">
          <label htmlFor="adapter-let" className="text-gray-700">
            let
          </label>
          <input type="text" id="adapter-let" onChange={(e) => setLet(e.currentTarget.value)}
                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                 name="let" placeholder="Adapter let"/>
        </div>
        <div className=" relative ">
          <label htmlFor="adapter-lng" className="text-gray-700">
            lng
          </label>
          <input type="text" id="adapter-lng" onChange={(e) => setLng(e.currentTarget.value)}
                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                 name="lng" placeholder="Adapter lng"/>
        </div>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-height" className="text-gray-700">
          Height
        </label>
        <input type="text" id="adapter-height"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="height" placeholder="Adapter height"/>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-country" className="text-gray-700">
          Country
        </label>
        <input type="text" id="adapter-name"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="country" placeholder="Adapter country"/>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-region" className="text-gray-700">
          Region
        </label>
        <input type="text" id="adapter-region"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="region" placeholder="Adapter region"/>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-city" className="text-gray-700">
          City
        </label>
        <input type="text" id="adapter-city"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="city" placeholder="Adapter city"/>
      </div>

      <div className=" relative ">
        <label htmlFor="adapter-street" className="text-gray-700">
          Street
        </label>
        <input type="text" id="adapter-street"
               className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="street" placeholder="Adapter street"/>
      </div>


      <button type="button" onClick={() => create()} className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        Create
      </button>

    </div>
  );
}

export default AgregatorCreateForm;
