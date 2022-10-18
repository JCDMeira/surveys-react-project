import { AuthenticationParams } from '@/domain/usecases/authentication';
import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/Invalid-credentials-erro';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statuesCode) {
      case HttpStatusCode.unathorarized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        return Promise.resolve();
    }
  }
}
