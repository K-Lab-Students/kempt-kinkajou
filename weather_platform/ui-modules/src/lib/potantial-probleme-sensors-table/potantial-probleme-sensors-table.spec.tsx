import { render } from '@testing-library/react';

import PotantialProblemeSensorsTable from './potantial-probleme-sensors-table';

describe('PotantialProblemeSensorsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PotantialProblemeSensorsTable />);
    expect(baseElement).toBeTruthy();
  });
});
