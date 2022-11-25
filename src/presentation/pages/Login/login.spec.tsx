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
  validationSpy.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('should not render spinner and error on start', () => {
    const { sut, validationSpy } = makeSut();

    const errorwrap = sut.getByTestId('error-wrap');
    expect(errorwrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });
  // test('should call validation with correct email', () => {
  //   const { sut, validationSpy } = makeSut();
  //   const emailInput = sut.getByTestId('email');
  //   const emailMock = faker.internet.email();
  //   fireEvent.input(emailInput, { target: { value: emailMock } });
  //   expect(validationSpy.fieldName).toEqual('email');
  //   expect(validationSpy.fieldValue).toEqual(emailMock);
  // });
  // test('should call validation with correct password', () => {
  //   const { sut, validationSpy } = makeSut();
  //   const passwordInput = sut.getByTestId('password');
  //   const passwordMock = faker.internet.password();
  //   fireEvent.input(passwordInput, { target: { value: passwordMock } });
  //   expect(validationSpy.fieldName).toEqual('password');
  //   expect(validationSpy.fieldValue).toEqual(passwordMock);
  // });
  test('should show e-mail error if validation fails', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });
  test('should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
