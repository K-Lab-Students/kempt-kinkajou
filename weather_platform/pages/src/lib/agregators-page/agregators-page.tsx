import styles from './agregators-page.module.scss';
import {AgregatorCreateForm, AgregatorTable} from "@weather-platform/ui-modules";
import {BaseLayout} from "@weather-platform/layout";

/* eslint-disable-next-line */
export interface AgregatorsPageProps {}

export function AgregatorsPage(props: AgregatorsPageProps) {
  return (
    <BaseLayout>
      <div className="flex w-full">
        <AgregatorCreateForm/>
        <AgregatorTable/>
      </div>
    </BaseLayout>
  );
}

export default AgregatorsPage;
