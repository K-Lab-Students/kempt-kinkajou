import styles from './sensor-page.module.scss';
import {BaseLayout} from "@weather-platform/layout";
import {SensorCreateForm, SensorsTable} from "@weather-platform/ui-modules";

/* eslint-disable-next-line */
export interface SensorPageProps {}

export function SensorPage(props: SensorPageProps) {
  return (
    <BaseLayout>
      <div className="flex w-full">
        <SensorCreateForm/>
        <SensorsTable/>
      </div>
    </BaseLayout>
  );
}

export default SensorPage;
