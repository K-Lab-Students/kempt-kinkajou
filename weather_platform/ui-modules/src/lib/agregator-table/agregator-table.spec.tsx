import { render } from '@testing-library/react';

import AgregatorTable from './agregator-table';

describe('AgregatorTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgregatorTable />);
    expect(baseElement).toBeTruthy();
  });
});
