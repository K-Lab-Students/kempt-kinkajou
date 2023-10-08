import { render } from '@testing-library/react';

import SensorsVebrationsGraph from './sensors-vebrations-graph';

describe('SensorsVebrationsGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsVebrationsGraph />);
    expect(baseElement).toBeTruthy();
  });
});
