module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^axios$': require.resolve('axios'),
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$':
      '<rootDir>/src/__mock__/mock.ts',
  },
};
