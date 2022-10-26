import { AxiosHttpClient } from './axios-http-client';
import faker from 'faker';
import axios from 'axios';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('shoul call AxiosHttpClient with correct values', async () => {
    const postParams = mockPostRequest();
    const sut = makeSut();
    await sut.post(postParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      postParams.url,
      postParams.body,
    );
  });
});
