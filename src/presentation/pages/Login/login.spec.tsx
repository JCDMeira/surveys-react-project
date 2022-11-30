import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Login from './index';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
  autenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const autenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={autenticationSpy} />,
  );
  return { sut, autenticationSpy };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email(),
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password(),
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo');
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login component', () => {
  afterEach(cleanup);

  test('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorwrap = sut.getByTestId('error-wrap');
    expect(errorwrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, 'email', validationError);
    simulateStatusForField(sut, 'password', validationError);
  });
  // test('should call validation with correct email', () => {
  //   const { sut, validationStub } = makeSut();
  //   const emailInput = sut.getByTestId('email');
  //   const emailMock = faker.internet.email();
  //   fireEvent.input(emailInput, { target: { value: emailMock } });
  //   expect(validationStub.fieldName).toEqual('email');
  //   expect(validationStub.fieldValue).toEqual(emailMock);
  // });
  // test('should call validation with correct password', () => {
  //   const { sut, validationStub } = makeSut();
  //   const passwordInput = sut.getByTestId('password');
  //   const passwordMock = faker.internet.password();
  //   fireEvent.input(passwordInput, { target: { value: passwordMock } });
  //   expect(validationStub.fieldName).toEqual('password');
  //   expect(validationStub.fieldValue).toEqual(passwordMock);
  // });
  test('should show e-mail error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationError);
  });
  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationError);
  });
  test('should show valid email state if validation succeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });
  test('should show valid password state if validation succeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password');
  });

  test('should enable submit button if form succeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    populateEmailField(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('should call autentication with correct values', () => {
    const { sut, autenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(autenticationSpy.params).toEqual({ email, password });
  });
});
