import { AxiosHttpClient } from './axios-http-client';
import faker from 'faker';
import axios from 'axios';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('should call AxiosHttpClient with correct values', async () => {
    const postParams = mockPostRequest();
    const sut = makeSut();
    await sut.post(postParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      postParams.url,
      postParams.body,
    );
  });
  test('should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    console.log({
      httpResponse,
      mocked: {
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      },
    });
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
