import styles from './agregator-table.module.scss';

/* eslint-disable-next-line */
export interface AgregatorTableProps {}

export function AgregatorTable(props: AgregatorTableProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AgregatorTable!</h1>
    </div>
  );
}

export default AgregatorTable;
