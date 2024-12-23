module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  // No setup files for integration tests as they use real DB
  // Only run files with integration.test in their name
  testMatch: ['**/*.integration.test.ts'],
  // Add custom environment variables for integration tests
  testEnvironmentOptions: {
    NODE_ENV: 'development'
  }
};
