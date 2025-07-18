import { LogError } from '../../../src/error/log.error';

describe('LogError', () => {
  describe('constructor', () => {
    it('should create LogError with default message', () => {
      const error = new LogError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(LogError);
      expect(error.message).toBe('Unprocessable Entity');
      expect(error.name).toBe('Unprocessable Entity');
      expect(error.status).toBe(422);
    });

    it('should create LogError with custom message', () => {
      const customMessage = 'Custom log error message';
      const error = new LogError(customMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(LogError);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe('Unprocessable Entity');
      expect(error.status).toBe(422);
    });

    it('should create LogError with empty string message', () => {
      const error = new LogError('');

      expect(error.message).toBe('');
      expect(error.name).toBe('Unprocessable Entity');
      expect(error.status).toBe(422);
    });
  });

  describe('properties', () => {
    it('should have correct status code', () => {
      const error = new LogError();
      expect(error.status).toBe(422);
    });

    it('should have correct name', () => {
      const error = new LogError();
      expect(error.name).toBe('Unprocessable Entity');
    });

    it('should inherit Error properties', () => {
      const error = new LogError();
      expect(error.stack).toBeDefined();
    });
  });

  describe('error throwing', () => {
    it('should be throwable and catchable', () => {
      expect(() => {
        throw new LogError('Test error');
      }).toThrow('Test error');
    });

    it('should be catchable as LogError instance', () => {
      try {
        throw new LogError('Test error');
      } catch (error) {
        expect(error).toBeInstanceOf(LogError);
        expect((error as LogError).status).toBe(422);
      }
    });

    it('should be catchable as Error instance', () => {
      try {
        throw new LogError('Test error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Test error');
      }
    });
  });
});
