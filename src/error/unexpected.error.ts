export class UnexpectedError extends Error {
  private readonly status: number;

  constructor(error: unknown) {
    super(
      'An error occurred while trying to perform this operation. Please check and try again.',
    );
    this.message =
      'An error occurred while trying to perform this operation. Please check and try again.';
    this.name = 'UnexpectedError';
    this.status = 500;
    console.error('UnexpectedError', { status: this.status, error });
  }
}
