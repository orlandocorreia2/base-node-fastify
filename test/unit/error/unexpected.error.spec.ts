import { UnexpectedError } from '../../../src/error/unexpected.error';

describe('UnexpectedError', () => {
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  describe('constructor', () => {
    it('should create an instance with standard error message', () => {
      const originalError = new Error('Test error');
      const error = new UnexpectedError(originalError);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnexpectedError);
      expect(error.message).toBe(
        'An error occurred while trying to perform this operation. Please check and try again.',
      );
      expect(error.name).toBe('UnexpectedError');
    });

    it('should create an instance with string error', () => {
      const error = new UnexpectedError('Something went wrong');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnexpectedError);
      expect(error.message).toBe(
        'An error occurred while trying to perform this operation. Please check and try again.',
      );
      expect(error.name).toBe('UnexpectedError');
    });

    it('should create an instance with null error', () => {
      const error = new UnexpectedError(null);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnexpectedError);
      expect(error.message).toBe(
        'An error occurred while trying to perform this operation. Please check and try again.',
      );
      expect(error.name).toBe('UnexpectedError');
    });

    it('should create an instance with undefined error', () => {
      const error = new UnexpectedError(undefined);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnexpectedError);
      expect(error.message).toBe(
        'An error occurred while trying to perform this operation. Please check and try again.',
      );
      expect(error.name).toBe('UnexpectedError');
    });

    it('should create an instance with object error', () => {
      const objectError = {
        code: 'E001',
        description: 'Database connection failed',
      };
      const error = new UnexpectedError(objectError);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnexpectedError);
      expect(error.message).toBe(
        'An error occurred while trying to perform this operation. Please check and try again.',
      );
      expect(error.name).toBe('UnexpectedError');
    });
  });

  describe('properties', () => {
    it('should have correct status code', () => {
      const error = new UnexpectedError('test error');

      // status is private, but we can check it through type assertion for testing
      expect((error as any).status).toBe(500);
    });

    it('should have correct name', () => {
      const error = new UnexpectedError('test error');
      expect(error.name).toBe('UnexpectedError');
    });

    it('should inherit from Error', () => {
      const error = new UnexpectedError('test error');
      expect(error instanceof Error).toBe(true);
    });

    it('should have stack trace', () => {
      const error = new UnexpectedError('test error');
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });

    it('should have consistent message property', () => {
      const error = new UnexpectedError('any error');
      const expectedMessage =
        'An error occurred while trying to perform this operation. Please check and try again.';

      expect(error.message).toBe(expectedMessage);
    });
  });

  describe('console logging', () => {
    it('should log error with Error object', () => {
      const originalError = new Error('Database connection failed');
      const error = new UnexpectedError(originalError);

      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: originalError,
      });
      expect(error).toBeDefined();
    });

    it('should log error with string', () => {
      const errorString = 'Something went wrong';
      const error = new UnexpectedError(errorString);

      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: errorString,
      });
      expect(error).toBeDefined();
    });

    it('should log error with null', () => {
      const error = new UnexpectedError(null);

      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: null,
      });
      expect(error).toBeDefined();
    });

    it('should log error with object', () => {
      const errorObject = { code: 'E001', message: 'Failed operation' };
      const error = new UnexpectedError(errorObject);

      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: errorObject,
      });
      expect(error).toBeDefined();
    });

    it('should log exactly once per instance creation', () => {
      const error = new UnexpectedError('test error');

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });

  describe('error throwing', () => {
    it('should be throwable', () => {
      expect(() => {
        throw new UnexpectedError('test error');
      }).toThrow(UnexpectedError);
    });

    it('should be catchable', () => {
      const originalError = new Error('Original error');

      try {
        throw new UnexpectedError(originalError);
      } catch (error) {
        expect(error).toBeInstanceOf(UnexpectedError);
        expect((error as UnexpectedError).message).toBe(
          'An error occurred while trying to perform this operation. Please check and try again.',
        );
        expect((error as any).status).toBe(500);
      }
    });

    it('should maintain error properties when thrown', () => {
      try {
        throw new UnexpectedError('test');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(UnexpectedError);
        expect((error as any).status).toBe(500);
        expect((error as UnexpectedError).name).toBe('UnexpectedError');
      }
    });
  });

  describe('use cases', () => {
    it('should handle database errors', () => {
      const dbError = new Error('Connection timeout');
      const error = new UnexpectedError(dbError);

      expect(error.name).toBe('UnexpectedError');
      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: dbError,
      });
    });

    it('should handle API errors', () => {
      const apiError = { statusCode: 503, message: 'Service unavailable' };
      const error = new UnexpectedError(apiError);

      expect(error.name).toBe('UnexpectedError');
      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: apiError,
      });
    });

    it('should handle unknown errors', () => {
      const unknownError = 'Unknown error occurred';
      const error = new UnexpectedError(unknownError);

      expect(error.name).toBe('UnexpectedError');
      expect(mockConsoleError).toHaveBeenCalledWith('UnexpectedError', {
        status: 500,
        error: unknownError,
      });
    });
  });
});
