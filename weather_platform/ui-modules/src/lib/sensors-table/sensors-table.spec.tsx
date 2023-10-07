import { render } from '@testing-library/react';

import SensorsTable from './sensors-table';

describe('SensorsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsTable />);
    expect(baseElement).toBeTruthy();
  });
});
