import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Login from './index';
import { ValidationSpy } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe('Login component', () => {
  afterEach(cleanup);

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
  test('should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    const emailMock = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: emailMock } });
    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual(emailMock);
  });
  test('should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const passwordMock = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual(passwordMock);
  });
});
