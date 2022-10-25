import { AuthenticationParams } from '@/domain/usecases';
import { AccontModel } from '../models';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccontModel => ({
  accessToken: faker.datatype.uuid(),
});
