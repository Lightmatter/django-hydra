module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '.*/cypress/.*'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  watchPlugins: ['jest-watch-typeahead/testname'],
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^models/(.*)$": "<rootDir>/src/models/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^util/(.*)$": "<rootDir>/src/util/$1",
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};
