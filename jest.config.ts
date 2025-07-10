export default {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  rootDir: './',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.reports',
        outputName: 'reports.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura', 'lcov'],
  coverageDirectory: '.reports/coverage',
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!src/app.ts'],
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@shared/(.*)$': '<rootDir>/src/shared/$1',
    '@module/(.*)$': '<rootDir>/src/modules/$1',
    '@infra/(.*)$': '<rootDir>/src/infra/$1',
    '@error/(.*)$': '<rootDir>/src/error/$1',
    '@util/(.*)$': '<rootDir>/src/utils/$1',
  },
  clearMocks: true,
  setupFiles: ['./test/setEnvVars.js'],
};
