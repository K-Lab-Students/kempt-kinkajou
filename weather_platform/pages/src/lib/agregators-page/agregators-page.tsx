import styles from './agregators-page.module.scss';

/* eslint-disable-next-line */
export interface AgregatorsPageProps {}

export function AgregatorsPage(props: AgregatorsPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AgregatorsPage!</h1>
    </div>
  );
}

export default AgregatorsPage;
