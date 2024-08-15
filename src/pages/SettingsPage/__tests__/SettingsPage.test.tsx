import { useAuth } from '@hooks/useAuth';
import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import { themes } from '../../../theme';
import { SettingsPage } from '../index';
import { useSettingsViewModel } from '../viewModel';

jest.mock('@react-navigation/native');
jest.mock('@hooks/useAuth');
jest.mock('@hooks/useThemeSwitcher');
jest.mock('../../../libs/storage/async-storage');
jest.mock('../viewModel');

describe('SignInPage Tests', () => {
  const navigateMock = jest.fn();
  const logoutMock = jest.fn();
  const handleChangeMock = jest.fn();
  const setSelectedMock = jest.fn();
  const changeThemeMock = jest.fn();
  const setItemMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    (useThemeSwitcher as jest.Mock).mockReturnValue({
      changeTheme: changeThemeMock,
      theme: { colors: { primary: '#000' } },
    });

    (AsyncStorageImpl as jest.Mock).mockImplementation(() => ({
      setItem: setItemMock,
    }));

    (useAuth as jest.Mock).mockReturnValue({
      logout: logoutMock,
    });

    (useSettingsViewModel as jest.Mock).mockReturnValue({
      options: [
        { label: 'Normal', value: 'default' },
        { label: 'Protanopia', value: 'protanopia' },
        { label: 'Deuteranopia', value: 'deuteranopia' },
        { label: 'Tritanopia', value: 'tritanopia' },
      ],
      selected: 'default',
      theme: themes.default,
      setSelected: setSelectedMock,
      handleChange: handleChangeMock,
    });
  });

  it('should display the BRQ logo with the correct testID', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SettingsPage />
      </ThemeProvider>
    );

    const logo = getByTestId('image-logo');
    expect(logo).toBeTruthy();
  });

  it('should render the settings page correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SettingsPage />
      </ThemeProvider>
    );

    expect(getByText('Configurações de Acessibilidade')).toBeTruthy();
    expect(getByText('Se você possui alguma deficiência visual, por favor, selecione a opção que melhor descreve sua condição.')).toBeTruthy();
  });

  it('when clicking on the picker select there should be the option Protanopia and Deuteranopia', () => {
    const { toJSON, getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SettingsPage />
      </ThemeProvider>
    );

    const picker = getByTestId('picker-select');
    fireEvent(picker, 'press');

    const tree = toJSON();
    expect(tree).toMatchSnapshot();

    const protanopiaFound = JSON.stringify(tree).includes('Protanopia');
    const deuteranopiaFound = JSON.stringify(tree).includes('Deuteranopia');

    expect(protanopiaFound).toBe(true);
    expect(deuteranopiaFound).toBe(true);
  });

  it('should call handleChange when the button is pressed', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SettingsPage />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Definir configuração'));

    expect(handleChangeMock).toHaveBeenCalled();
  });

  it('should call logout when the logout button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SettingsPage />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId('logout-button'));

    expect(logoutMock).toHaveBeenCalled();
  });

  // TODO: Fix this test RNPickerSelect
  // it('should update selected value', async () => {
  //   const { result } = renderHook(() => useSettingsViewModel());

  //   act(() => {
  //     result.current.setSelected('protanopia');
  //   });

  //   await waitFor(() => {
  //     expect(result.current.selected).toBe('protanopia');
  //   });
  // });
});