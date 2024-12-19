export class ErrorWithStatus extends Error {
  constructor(
    public name: TErrorName,
    public message: string,
    public status: TStatusCode,
    public path: string = '',
  ) {
    super(message);
    this.name = name;
    this.status = status;
    this.path = path;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
