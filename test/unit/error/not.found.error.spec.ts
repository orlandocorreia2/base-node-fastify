import { NotFoundError } from '../../../src/error/not.found.error';

describe('NotFoundError', () => {
  describe('constructor', () => {
    it('should create an instance with default message', () => {
      const error = new NotFoundError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('Not found');
      expect(error.name).toBe('Not found');
      expect(error.status).toBe(404);
    });

    it('should create an instance with custom message', () => {
      const customMessage = 'Resource not found';
      const error = new NotFoundError(customMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe('Not found');
      expect(error.status).toBe(404);
    });

    it('should create an instance with empty string message', () => {
      const error = new NotFoundError('');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('');
      expect(error.name).toBe('Not found');
      expect(error.status).toBe(404);
    });
  });

  describe('properties', () => {
    it('should have correct status code', () => {
      const error = new NotFoundError();
      expect(error.status).toBe(404);
    });

    it('should have correct name', () => {
      const error = new NotFoundError();
      expect(error.name).toBe('Not found');
    });

    it('should inherit from Error', () => {
      const error = new NotFoundError();
      expect(error instanceof Error).toBe(true);
    });

    it('should have stack trace', () => {
      const error = new NotFoundError();
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });
  });

  describe('error throwing', () => {
    it('should be throwable', () => {
      expect(() => {
        throw new NotFoundError();
      }).toThrow(NotFoundError);
    });

    it('should be catchable with custom message', () => {
      const customMessage = 'User not found';

      try {
        throw new NotFoundError(customMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect((error as NotFoundError).message).toBe(customMessage);
        expect((error as NotFoundError).status).toBe(404);
      }
    });

    it('should maintain error properties when thrown', () => {
      try {
        throw new NotFoundError('Test error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NotFoundError);
        expect((error as NotFoundError).status).toBe(404);
        expect((error as NotFoundError).name).toBe('Not found');
        expect((error as NotFoundError).message).toBe('Test error');
      }
    });
  });
});
