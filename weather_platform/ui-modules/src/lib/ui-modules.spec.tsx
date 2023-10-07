import { render } from '@testing-library/react';

import UiModules from './ui-modules';

describe('UiModules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiModules />);
    expect(baseElement).toBeTruthy();
  });
});
