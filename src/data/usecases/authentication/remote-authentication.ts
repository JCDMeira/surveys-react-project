import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccontModel } from '@/domain/models';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccontModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccontModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statuesCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorarized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
