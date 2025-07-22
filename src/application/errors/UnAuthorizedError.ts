export default class UnAuthorizedError extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    Error.captureStackTrace(this);
  }
}
