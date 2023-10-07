import { render } from '@testing-library/react';

import SensorsHumidityGraph from './sensors-humidity-graph';

describe('SensorsHumidityGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsHumidityGraph />);
    expect(baseElement).toBeTruthy();
  });
});
