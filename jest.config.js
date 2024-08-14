module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: [
    '<rootDir>/__mocks__/globalMock.js', 
    '@testing-library/react-native/dont-cleanup-after-each'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@testing-library|@react-navigation|@react-native-community)"
  ],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: [
    './src/components/*.{ts,tsx}',
    './src/hooks/*.{ts,tsx}',
    './src/pages/*.{ts,tsx}',
    './src/libs/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.config.js',
    '!**/src/config/**',
    '!**/ReactotronConfig.js',
    '!**/src/routes/**',
    '!**/jest.config.js',
    '!**/prettier.config.js',
  ]
};
