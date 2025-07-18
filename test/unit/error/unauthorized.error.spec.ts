import { UnauthorizedError } from '../../../src/error/unauthorized.error';

describe('UnauthorizedError', () => {
  describe('constructor', () => {
    it('should create an instance with default message', () => {
      const error = new UnauthorizedError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe('Unauthorized');
      expect(error.name).toBe('UnauthorizedError');
      expect(error.status).toBe(401);
    });

    it('should create an instance with custom message', () => {
      const customMessage = 'Access denied';
      const error = new UnauthorizedError(customMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe('UnauthorizedError');
      expect(error.status).toBe(401);
    });

    it('should create an instance with empty string message', () => {
      const error = new UnauthorizedError('');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe('');
      expect(error.name).toBe('UnauthorizedError');
      expect(error.status).toBe(401);
    });

    it('should create an instance with token-related message', () => {
      const tokenMessage = 'Invalid token provided';
      const error = new UnauthorizedError(tokenMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe(tokenMessage);
      expect(error.name).toBe('UnauthorizedError');
      expect(error.status).toBe(401);
    });
  });

  describe('properties', () => {
    it('should have correct status code', () => {
      const error = new UnauthorizedError();
      expect(error.status).toBe(401);
    });

    it('should have correct name', () => {
      const error = new UnauthorizedError();
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should inherit from Error', () => {
      const error = new UnauthorizedError();
      expect(error instanceof Error).toBe(true);
    });

    it('should have stack trace', () => {
      const error = new UnauthorizedError();
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });

    it('should maintain message property consistency', () => {
      const message = 'Custom unauthorized message';
      const error = new UnauthorizedError(message);

      // The constructor sets this.message = message, so it should be consistent
      expect(error.message).toBe(message);
    });
  });

  describe('error throwing', () => {
    it('should be throwable', () => {
      expect(() => {
        throw new UnauthorizedError();
      }).toThrow(UnauthorizedError);
    });

    it('should be catchable with custom message', () => {
      const customMessage = 'Authentication failed';

      try {
        throw new UnauthorizedError(customMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedError);
        expect((error as UnauthorizedError).message).toBe(customMessage);
        expect((error as UnauthorizedError).status).toBe(401);
      }
    });

    it('should maintain error properties when thrown', () => {
      try {
        throw new UnauthorizedError('Test unauthorized error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(UnauthorizedError);
        expect((error as UnauthorizedError).status).toBe(401);
        expect((error as UnauthorizedError).name).toBe('UnauthorizedError');
        expect((error as UnauthorizedError).message).toBe(
          'Test unauthorized error',
        );
      }
    });

    it('should be distinguishable from other error types', () => {
      const error = new UnauthorizedError();

      expect(error instanceof Error).toBe(true);
      expect(error instanceof UnauthorizedError).toBe(true);
      expect(error.constructor.name).toBe('UnauthorizedError');
    });
  });

  describe('use cases', () => {
    it('should work for authentication scenarios', () => {
      const authError = new UnauthorizedError('Invalid credentials');

      expect(authError.status).toBe(401);
      expect(authError.message).toBe('Invalid credentials');
      expect(authError.name).toBe('UnauthorizedError');
    });

    it('should work for authorization scenarios', () => {
      const authzError = new UnauthorizedError('Insufficient permissions');

      expect(authzError.status).toBe(401);
      expect(authzError.message).toBe('Insufficient permissions');
      expect(authzError.name).toBe('UnauthorizedError');
    });

    it('should work for token validation scenarios', () => {
      const tokenError = new UnauthorizedError('Token expired');

      expect(tokenError.status).toBe(401);
      expect(tokenError.message).toBe('Token expired');
      expect(tokenError.name).toBe('UnauthorizedError');
    });
  });
});
