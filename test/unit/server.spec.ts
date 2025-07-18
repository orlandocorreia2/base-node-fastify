import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals';

// Mock all dependencies before importing server
jest.mock('reflect-metadata');
jest.mock('dotenv/config');
jest.mock('../../src/utils/env', () => ({
  envNumber: jest.fn(),
  env: jest.fn(),
}));
jest.mock('../../src/app', () => ({
  app: {
    listen: jest.fn(),
  },
}));

describe('Server', () => {
  let mockEnvNumber: jest.Mock;
  let mockEnv: jest.Mock;
  let mockAppListen: jest.Mock;
  let mockProcessExit: any;
  let mockConsoleError: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    // Setup mocks
    const envModule = require('../../src/utils/env');
    const appModule = require('../../src/app');
    
    mockEnvNumber = envModule.envNumber;
    mockEnv = envModule.env;
    mockAppListen = appModule.app.listen;

    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as any);
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockProcessExit.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('should start server with correct port and host', () => {
    mockEnvNumber.mockReturnValue(3000);
    mockEnv.mockReturnValue('localhost');

    require('../../src/server');

    expect(mockEnvNumber).toHaveBeenCalledWith({ key: 'PORT' });
    expect(mockEnv).toHaveBeenCalledWith({ key: 'HOST' });
    expect(mockAppListen).toHaveBeenCalledWith(
      { port: 3000, host: 'localhost' },
      expect.any(Function)
    );
  });

  it('should log success message when server starts successfully', () => {
    mockEnvNumber.mockReturnValue(3000);
    mockEnv.mockReturnValue('localhost');

    mockAppListen.mockImplementation((_: any, callback: any) => {
      callback(null);
    });

    require('../../src/server');

    expect(mockConsoleError).toHaveBeenCalledWith('Server is running on port 3000');
  });

  it('should handle server start error and exit process', () => {
    mockEnvNumber.mockReturnValue(3000);
    mockEnv.mockReturnValue('localhost');

    const testError = new Error('Server start failed');
    mockAppListen.mockImplementation((_: any, callback: any) => {
      callback(testError);
    });

    expect(() => {
      require('../../src/server');
    }).toThrow('process.exit called');

    expect(mockConsoleError).toHaveBeenCalledWith('Erro fatal!', testError);
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  it('should use environment variables for configuration', () => {
    mockEnvNumber.mockReturnValue(8080);
    mockEnv.mockReturnValue('0.0.0.0');

    require('../../src/server');

    expect(mockAppListen).toHaveBeenCalledWith(
      { port: 8080, host: '0.0.0.0' },
      expect.any(Function)
    );
  });

  it('should work with production environment values', () => {
    mockEnvNumber.mockReturnValue(443);
    mockEnv.mockReturnValue('production.example.com');

    mockAppListen.mockImplementation((_: any, callback: any) => {
      callback(null);
    });

    require('../../src/server');

    expect(mockAppListen).toHaveBeenCalledWith(
      { port: 443, host: 'production.example.com' },
      expect.any(Function)
    );
    expect(mockConsoleError).toHaveBeenCalledWith('Server is running on port 443');
  });

  it('should handle different types of server errors', () => {
    mockEnvNumber.mockReturnValue(3000);
    mockEnv.mockReturnValue('localhost');

    const networkError = new Error('EADDRINUSE: Address already in use');
    mockAppListen.mockImplementation((_: any, callback: any) => {
      callback(networkError);
    });

    expect(() => {
      require('../../src/server');
    }).toThrow('process.exit called');

    expect(mockConsoleError).toHaveBeenCalledWith('Erro fatal!', networkError);
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  it('should log messages in Portuguese as expected', () => {
    mockEnvNumber.mockReturnValue(3000);
    mockEnv.mockReturnValue('localhost');

    const error = new Error('Test error');
    mockAppListen.mockImplementation((_: any, callback: any) => {
      callback(error);
    });

    expect(() => {
      require('../../src/server');
    }).toThrow('process.exit called');

    // Verify Portuguese error message
    expect(mockConsoleError).toHaveBeenCalledWith('Erro fatal!', error);
  });
});
