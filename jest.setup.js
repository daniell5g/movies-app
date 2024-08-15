jest.mock('@expo/vector-icons', () => ({
  Feather: '',
  MaterialIcons: ''
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));