import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccontModel } from '../models/account-model';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccontModel => ({
  accessToken: faker.random.uuid(),
});
