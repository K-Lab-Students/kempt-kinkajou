import styles from './sensors-on-map.module.scss';
import {YMaps, Map, Circle, Clusterer, Placemark} from '@pbe/react-yandex-maps';
import {Prisma, Sensor} from "@weather-platform/prisma-clients/Sensors";
import {Prisma as PrismaAgr, Agregator} from "@weather-platform/prisma-clients/Agregators";
import axios from "axios";
import {AGW_URL} from "../../../../agw";
import {useEffect, useState} from "react";

/* eslint-disable-next-line */
export interface SensorsOnMapProps {}

export function SensorsOnMap(props: SensorsOnMapProps) {
  const fetchGetSensorsList = async (params: Prisma.SensorFindManyArgs = {}) => {
    try {
      const response = await axios.post( AGW_URL + '/api/v1/sensors/get-with-params', params);
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
        lat: true,
        lng: true,
      }
    });
    if (response !== null) {
      setSensors(response);
    }
  };

  const fetchGetAgregatorsList = async (params: PrismaAgr.AgregatorFindManyArgs = {}) => {
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
    const response = await fetchGetAgregatorsList({
      select: {
        lat: true,
        lng: true,
      }
    });
    if (response !== null) {
      setAgregators(response);
    }
  };

  function upd() {
    updateAgregatorsData();
    updateSensorsData();
  }

  useEffect(() => {
    upd();
    const interval = setInterval(upd, 30000);
    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const mergedArray = [...agregators, ...sensors];
  // const temperatures = agregators.map(item => [item.lng, item.lat]);
  // console.log(temperatures);
  return (
    <div className="rounded-2xl w-full h-full mx-4">
      <YMaps>
        <Map defaultState={{ center: [47.2362, 38.8969], zoom: 11 }} width={"100%"} height={"100%"}>
          <Circle
            geometry={[[47.205577, 38.941490], 5000]}
            options={{
              draggable: false,
              fillColor: "#DB709377",
              strokeColor: "#990066",
              strokeOpacity: 0.8,
              strokeWidth: 5,
            }}
          />
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {agregators?.map((agregator:any, index:any) => (
              <Placemark key={index} geometry={{ type: "Point", coordinates: [agregator.lat, agregator.lng] }} />
            ))}
            {sensors?.map((agregator:any, index:any) => (
              <Placemark key={index} geometry={{ type: "Point", coordinates: [agregator.lat, agregator.lng] }} />
            ))}
          </Clusterer>
        </Map>
      </YMaps>
    </div>
  );
}

export default SensorsOnMap;
