export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorarized = 401,
  notFound = 404,
  severError = 500,
}
export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
