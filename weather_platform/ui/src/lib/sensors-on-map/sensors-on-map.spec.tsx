import { render } from '@testing-library/react';

import SensorsOnMap from './sensors-on-map';

describe('SensorsOnMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsOnMap />);
    expect(baseElement).toBeTruthy();
  });
});
