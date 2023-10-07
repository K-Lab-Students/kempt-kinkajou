import { render } from '@testing-library/react';

import SensorCreateForm from './sensor-create-form';

describe('SensorCreateForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensorCreateForm />);
    expect(baseElement).toBeTruthy();
  });
});
