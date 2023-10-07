import styles from './navbar.module.scss';
import {NavLink} from "@weather-platform/ui";
import scarlet from './scarlet.jpg';
/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600 mx-6 my-4 rounded-2xl drop-shadow-lg">

      {/*  Primary Navigation Menu*/}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/*LOGO*/}
            <div className="shrink-0 flex items-center">
              <a href="/" className="flex space-x-2 items-center">
                <img src={"https://git.djft.ru/avatars/9f5343fc9d97fdb7f08afabf3c472334?size=420"} className="block h-9 w-auto rounded-full" />
                <span className="font-bold text-gray-400">Weather</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink href={"/"} text={"🌁 Dashboard"} />
              <NavLink href={"/agregators"} text={"📝 Agregators"}/>
              <NavLink href={"/sensors"} text={"🔊 Sensors"}/>
            </div>

          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {/* Settings Dropdown */}
            <div className="ml-3 relative"></div>
          </div>
        </div>

        <div className="absolute top-3 right-2 flex space-x-4 items-center">
          <p className='text-gray-400'>K-Lab</p>
          <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer" src={scarlet} alt="Artem Darius Weber"/>
        </div>
      </div>


      {/*  Responsive Navigation Menu  */}
    </nav>
  );
}

export default Navbar;
