module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^axios$': require.resolve('axios'),
  },
};
