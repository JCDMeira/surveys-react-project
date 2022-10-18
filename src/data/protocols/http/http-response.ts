export enum HttpStatusCode {
  noContent = 204,
  badRequest = 400,
  unathorarized = 401,
}
export type HttpResponse = {
  statuesCode: HttpStatusCode;
  body?: any;
};
