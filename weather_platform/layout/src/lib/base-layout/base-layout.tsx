import styles from './base-layout.module.scss';

/* eslint-disable-next-line */
export interface BaseLayoutProps {}

export function BaseLayout(props: BaseLayoutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BaseLayout!</h1>
    </div>
  );
}

export default BaseLayout;
