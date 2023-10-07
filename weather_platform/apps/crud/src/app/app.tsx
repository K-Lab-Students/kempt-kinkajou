// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NxWelcome from './nx-welcome';
import {AgregatorsPage, Dashboard, SensorPage} from "@weather-platform/pages";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/agregators" element={<AgregatorsPage/>} />
        <Route path="/sensors" element={<SensorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
