import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './index';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return { sut };
};

describe('Login component', () => {
  test('should not render spinner and error on start', () => {
    const { sut } = makeSut();

    const errorwrap = sut.getByTestId('error-wrap');
    expect(errorwrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
