export class UnprocessableError extends Error {
  status = 422;

  constructor(message: string = 'Unprocessable') {
    super(message);
    this.name = 'UnprocessableError';
  }
}
