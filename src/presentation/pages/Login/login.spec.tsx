import React from 'react';
import { render } from '@testing-library/react';
import Login from './index';

describe('Login component', () => {
  test('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />);

    const errorwrap = getByTestId('error-wrap');
    expect(errorwrap.childElementCount).toBe(0);

    const submitButton = getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});
