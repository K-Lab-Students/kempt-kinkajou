import { render } from '@testing-library/react';

import BaseLayout from './base-layout';

describe('BaseLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseLayout />);
    expect(baseElement).toBeTruthy();
  });
});
