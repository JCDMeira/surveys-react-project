import { HttpPostParams } from '@/data/protocols/http';
// import axios from 'axios';
const axios = (prop: string): string => prop;

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}
