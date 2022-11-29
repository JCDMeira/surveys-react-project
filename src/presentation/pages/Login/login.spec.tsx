import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Login from './index';
import { ValidationStub } from '@/presentation/test';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccontModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  async auth(params: AuthenticationParams): Promise<AccontModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

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

describe('Login component', () => {
  afterEach(cleanup);

  test('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorwrap = sut.getByTestId('error-wrap');
    expect(errorwrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
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
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });
  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });
  test('should show valid email state if validation succeds', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo');
    expect(emailStatus.textContent).toBe('🟢');
  });
  test('should show valid password state if validation succeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('should enable submit button if form succeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('should call autentication with correct values', () => {
    const { sut, autenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: email },
    });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);

    expect(autenticationSpy.params).toEqual({ email, password });
  });
});
