import { render } from '@testing-library/react';

import AgregatorTableItem from './agregator-table-item';

describe('AgregatorTableItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgregatorTableItem />);
    expect(baseElement).toBeTruthy();
  });
});
