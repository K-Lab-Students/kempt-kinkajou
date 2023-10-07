import styles from './agregator-table-item.module.scss';

/* eslint-disable-next-line */
export interface AgregatorTableItemProps {}

export function AgregatorTableItem(props: AgregatorTableItemProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AgregatorTableItem!</h1>
    </div>
  );
}

export default AgregatorTableItem;
