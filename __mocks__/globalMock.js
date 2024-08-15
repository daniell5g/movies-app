import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

global.WebSocket = () => {};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const reactotron = {
  configure: () => reactotron,
  useReactNative: () => reactotron,
  use: () => reactotron,
  connect: () => reactotron,
  clear: () => reactotron,
  createEnhancer: () => reactotron
};
jest.mock("reactotron-react-native", () => reactotron);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
