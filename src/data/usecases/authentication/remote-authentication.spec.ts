import * as faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { InvalidCredentialsError } from '@/domain/errors/Invalid-credentials-erro';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import {
  mockAccountModel,
  mockAuthentication,
} from '@/domain/test/mock-account';
import { AccontModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccontModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccontModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statuesCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statuesCode: HttpStatusCode.unathorarized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statuesCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statuesCode: HttpStatusCode.severError,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should returns AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpRseult = mockAccountModel();
    httpPostClientSpy.response = {
      statuesCode: HttpStatusCode.ok,
      body: httpRseult,
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpRseult);
  });
});
