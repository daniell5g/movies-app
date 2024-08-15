module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'], 
  setupFilesAfterEnv: [
    '<rootDir>/__mocks__/globalMock.js', 
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@testing-library|@react-navigation|@react-native-community|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules|unimodules|sentry-expo|native-base|react-clone-referenced-element|@react-native-picker|@react-native-community|@expo/vector-icons|expo-font|expo-constants)"
  ], 
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)', 
    '**/?(*.)+(spec|test).[jt]s?(x)', 
  ],
  collectCoverage: true, 
  silent: true,
  coverageDirectory: '__tests__/coverage', 
  collectCoverageFrom: [
    './src/components/**/*.tsx',  
    './src/hooks/**/*.ts',        
    './src/pages/**/*.ts',        
    './src/pages/**/*.tsx',       
    './src/libs/**/*.ts',         
    './src/libs/**/*.tsx',  
    '!**/coverage/**', 
    '!**/node_modules/**', 
    '!**/babel.config.js', 
    '!**/jest.config.js', 
    '!**/src/config/**', 
    '!**/ReactotronConfig.js', 
    '!**/src/routes/**', 
    '!**/prettier.config.js', 
  ]
};
