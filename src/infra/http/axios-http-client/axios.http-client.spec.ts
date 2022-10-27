import { AxiosHttpClient } from './axios-http-client';
import { mockPostRequest } from '@/data/test';
import { mockAxios } from '@/infra/test';
import axios from 'axios';

jest.mock('axios');

type sutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): sutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  test('should call AxiosHttpClient with correct values', async () => {
    const postParams = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(postParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      postParams.url,
      postParams.body,
    );
  });
  test('should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = sut.post(mockPostRequest());
    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
