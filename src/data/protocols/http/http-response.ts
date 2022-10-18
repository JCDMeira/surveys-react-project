export enum HttpStatusCode {
  noContent = 204,
  unathorarized = 401,
}
export type HttpResponse = {
  statuesCode: HttpStatusCode;
  body?: any;
};
