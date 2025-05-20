export class NotFoundError extends Error {
  status = 404;

  constructor(message: string = 'Not found') {
    super(message);
    this.name = 'Not found';
  }
}
