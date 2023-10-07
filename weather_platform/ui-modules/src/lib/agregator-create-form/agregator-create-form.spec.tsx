import { render } from '@testing-library/react';

import AgregatorCreateForm from './agregator-create-form';

describe('AgregatorCreateForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgregatorCreateForm />);
    expect(baseElement).toBeTruthy();
  });
});
