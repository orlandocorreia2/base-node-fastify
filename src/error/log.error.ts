export class LogError extends Error {
  status = 422;

  constructor(message: string = 'Unprocessable Entity') {
    super(message);
    this.name = 'Unprocessable Entity';
  }
}
