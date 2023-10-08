import { render } from '@testing-library/react';

import SensorsLuminGraph from './sensors-lumin-graph';

describe('SensorsLuminGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsLuminGraph />);
    expect(baseElement).toBeTruthy();
  });
});
