import { render } from '@testing-library/react';

import SensorPage from './sensor-page';

describe('SensorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorPage />);
    expect(baseElement).toBeTruthy();
  });
});
