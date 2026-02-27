/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  rootDir: '..',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1',
    '^(\\.{1,2}/.*)$': '$1',
    '^@noble/curves/(.*)$': '<rootDir>/node_modules/@noble/curves/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['<rootDir>/tests/e2e/**/*.e2e.test.ts'],
  testTimeout: 60_000,
  maxWorkers: 1,
  globalSetup: '<rootDir>/tests/e2e/globalSetup.ts',
  globalTeardown: '<rootDir>/tests/e2e/globalTeardown.ts',
};
