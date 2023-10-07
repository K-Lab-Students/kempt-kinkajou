import { render } from '@testing-library/react';

import AgregatorsPage from './agregators-page';

describe('AgregatorsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgregatorsPage />);
    expect(baseElement).toBeTruthy();
  });
});
