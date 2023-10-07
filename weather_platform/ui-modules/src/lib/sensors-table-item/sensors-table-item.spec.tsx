import { render } from '@testing-library/react';

import SensorsTableItem from './sensors-table-item';

describe('SensorsTableItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorsTableItem />);
    expect(baseElement).toBeTruthy();
  });
});
