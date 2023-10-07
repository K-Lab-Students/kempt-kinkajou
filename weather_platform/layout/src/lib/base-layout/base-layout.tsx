import styles from './base-layout.module.scss';
import {Navbar} from "@weather-platform/ui-modules";

/* eslint-disable-next-line */
export interface BaseLayoutProps {
  children: React.ReactNode
}

export function BaseLayout(props: BaseLayoutProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen pt-24 px-4 sm:px-2">
        {props.children}
      </div>

      <div className={"absolute top-0 w-screen"}>
        <Navbar />
      </div>
    </>
  );
}

export default BaseLayout;
