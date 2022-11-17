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

    const emailStatus = getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
