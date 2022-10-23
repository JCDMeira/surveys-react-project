import { InvalidCredentialsError } from '@/domain/errors/Invalid-credentials-erro';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccontModel } from '@/domain/models/account-model';
import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccontModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statuesCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unathorarized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
