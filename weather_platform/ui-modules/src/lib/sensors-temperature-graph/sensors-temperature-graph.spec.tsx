import { render } from '@testing-library/react';

import SensorsTemperatureGraph from './sensors-temperature-graph';

describe('SensorsTemperatureGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsTemperatureGraph />);
    expect(baseElement).toBeTruthy();
  });
});
