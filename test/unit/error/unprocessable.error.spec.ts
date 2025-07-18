import { UnprocessableError } from '../../../src/error/unprocessable.error';

describe('UnprocessableError', () => {
  describe('constructor', () => {
    it('should create an instance with default message', () => {
      const error = new UnprocessableError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnprocessableError);
      expect(error.message).toBe('Unprocessable');
      expect(error.name).toBe('UnprocessableError');
      expect(error.status).toBe(422);
    });

    it('should create an instance with custom message', () => {
      const customMessage = 'Invalid data format';
      const error = new UnprocessableError(customMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnprocessableError);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe('UnprocessableError');
      expect(error.status).toBe(422);
    });

    it('should create an instance with empty string message', () => {
      const error = new UnprocessableError('');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnprocessableError);
      expect(error.message).toBe('');
      expect(error.name).toBe('UnprocessableError');
      expect(error.status).toBe(422);
    });

    it('should create an instance with validation message', () => {
      const validationMessage = 'Required field is missing';
      const error = new UnprocessableError(validationMessage);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnprocessableError);
      expect(error.message).toBe(validationMessage);
      expect(error.name).toBe('UnprocessableError');
      expect(error.status).toBe(422);
    });
  });

  describe('properties', () => {
    it('should have correct status code', () => {
      const error = new UnprocessableError();
      expect(error.status).toBe(422);
    });

    it('should have correct name', () => {
      const error = new UnprocessableError();
      expect(error.name).toBe('UnprocessableError');
    });

    it('should inherit from Error', () => {
      const error = new UnprocessableError();
      expect(error instanceof Error).toBe(true);
    });

    it('should have stack trace', () => {
      const error = new UnprocessableError();
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });

    it('should maintain message property consistency', () => {
      const message = 'Custom unprocessable message';
      const error = new UnprocessableError(message);
      
      expect(error.message).toBe(message);
    });
  });

  describe('error throwing', () => {
    it('should be throwable', () => {
      expect(() => {
        throw new UnprocessableError();
      }).toThrow(UnprocessableError);
    });

    it('should be catchable with custom message', () => {
      const customMessage = 'Validation failed';
      
      try {
        throw new UnprocessableError(customMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableError);
        expect((error as UnprocessableError).message).toBe(customMessage);
        expect((error as UnprocessableError).status).toBe(422);
      }
    });

    it('should maintain error properties when thrown', () => {
      try {
        throw new UnprocessableError('Test unprocessable error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(UnprocessableError);
        expect((error as UnprocessableError).status).toBe(422);
        expect((error as UnprocessableError).name).toBe('UnprocessableError');
        expect((error as UnprocessableError).message).toBe('Test unprocessable error');
      }
    });

    it('should be distinguishable from other error types', () => {
      const error = new UnprocessableError();
      
      expect(error instanceof Error).toBe(true);
      expect(error instanceof UnprocessableError).toBe(true);
      expect(error.constructor.name).toBe('UnprocessableError');
    });
  });

  describe('use cases', () => {
    it('should work for validation errors', () => {
      const validationError = new UnprocessableError('Email format is invalid');
      
      expect(validationError.status).toBe(422);
      expect(validationError.message).toBe('Email format is invalid');
      expect(validationError.name).toBe('UnprocessableError');
    });

    it('should work for data format errors', () => {
      const formatError = new UnprocessableError('JSON format is invalid');
      
      expect(formatError.status).toBe(422);
      expect(formatError.message).toBe('JSON format is invalid');
      expect(formatError.name).toBe('UnprocessableError');
    });

    it('should work for business rule violations', () => {
      const businessError = new UnprocessableError('Cannot delete user with active subscriptions');
      
      expect(businessError.status).toBe(422);
      expect(businessError.message).toBe('Cannot delete user with active subscriptions');
      expect(businessError.name).toBe('UnprocessableError');
    });

    it('should work for schema validation errors', () => {
      const schemaError = new UnprocessableError('Required fields: name, email');
      
      expect(schemaError.status).toBe(422);
      expect(schemaError.message).toBe('Required fields: name, email');
      expect(schemaError.name).toBe('UnprocessableError');
    });

    it('should work for constraint violations', () => {
      const constraintError = new UnprocessableError('Username already exists');
      
      expect(constraintError.status).toBe(422);
      expect(constraintError.message).toBe('Username already exists');
      expect(constraintError.name).toBe('UnprocessableError');
    });
  });

  describe('HTTP status code compliance', () => {
    it('should use correct HTTP 422 status code', () => {
      const error = new UnprocessableError();
      
      // 422 is the standard HTTP status code for "Unprocessable Entity"
      expect(error.status).toBe(422);
    });

    it('should be suitable for API responses', () => {
      const error = new UnprocessableError('Invalid request payload');
      
      expect(error.status).toBe(422);
      expect(error.message).toBe('Invalid request payload');
      expect(error.name).toBe('UnprocessableError');
      
      // Should have all properties needed for API error response
      expect(error).toHaveProperty('status');
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
    });
  });
});
