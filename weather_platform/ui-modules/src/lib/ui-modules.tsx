import styles from './ui-modules.module.scss';

/* eslint-disable-next-line */
export interface UiModulesProps {}

export function UiModules(props: UiModulesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UiModules!</h1>
    </div>
  );
}

export default UiModules;
