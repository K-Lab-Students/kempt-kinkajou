import styles from './nav-link.module.scss';
import { NavLink as RouterNavLink } from "react-router-dom";

/* eslint-disable-next-line */
export interface NavLinkProps {
  href: string;
  text?: string;
  children?: React.ReactNode; // Add the children prop and its type
}

export function NavLink(props: NavLinkProps) {
  return (
    <RouterNavLink
      to={props.href}
      className={({ isActive, isPending }) =>
        isPending
          ? ""
          : isActive
            ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out dark:hover:text-gray-200"
            : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out dark:hover:text-gray-200"
      }
    >
      {props.text}
    </RouterNavLink>
  );
}

export default NavLink;
