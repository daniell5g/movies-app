jest.mock('@expo/vector-icons', () => ({
  Feather: '',
  MaterialIcons: '',
  AntDesign: '',
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn(({ children }) => children),
      Screen: jest.fn(() => null),
    }),
  };
});

jest.mock('react-native-screens', () => {
  return {
    enableScreens: jest.fn(),
  };
});

jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetInfo: jest.fn().mockReturnValue({
      isConnected: true,
      isInternetReachable: true,
    }),
    fetch: jest.fn().mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    }),
    addEventListener: jest.fn().mockReturnValue(jest.fn()),
    removeEventListener: jest.fn(),
  };
});
