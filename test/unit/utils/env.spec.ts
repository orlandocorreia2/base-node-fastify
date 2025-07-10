import { env, envNumber } from '../../../src/utils/env';

describe('env', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return the environment variable value if set', () => {
    process.env.APP = 'Jarvis';
    expect(env({ key: 'APP' })).toBe('Jarvis');
  });

  it('should return the default value if the environment variable is not set', () => {
    delete process.env.JWT_SECRET;
    expect(env({ key: 'JWT_SECRET', defaultValue: 'default' })).toBe('default');
  });

  it('should return an empty string if variable and default are not set', () => {
    delete process.env.JWT_SECRET;
    expect(env({ key: 'JWT_SECRET' })).toBe('');
  });
});

describe('envNumber', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return the number value if environment variable is a valid number', () => {
    process.env.PORT = '123';
    expect(envNumber({ key: 'PORT' })).toBe(123);
  });

  it('should return the default value if the environment variable is not set', () => {
    delete process.env.PORT;
    expect(envNumber({ key: 'PORT', defaultValue: 456 })).toBe(456);
  });

  it('should return 0 for string "0"', () => {
    process.env.PORT = '0';
    expect(envNumber({ key: 'PORT' })).toBe(0);
  });
});
