// Default config runs only unit tests
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  // Exclude integration tests by default
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/tests/integration/'
  ],
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
};
