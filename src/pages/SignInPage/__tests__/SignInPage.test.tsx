import { useAuth } from '@hooks/useAuth';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { useAuthStore } from '../../../store/authStore';
import { themes } from '../../../theme';
import { SignInPage } from '../index'

jest.mock('@hooks/useAuth');
jest.mock('../../../store/authStore');
jest.mock('@hooks/useNetworkStatus');

describe('SignInPage Tests', () => {
  const loginMock = jest.fn();
  let isConnectedMock: boolean;

  beforeAll(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      loggedIn: false,
      logout: jest.fn(),
    });


    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: loginMock,
      loggedIn: false,
      logout: jest.fn(),
    });

    (useNetworkStatus as jest.Mock).mockReturnValue(isConnectedMock);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should display the BRQ logo with the correct testID', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const logo = getByTestId('image-logo');
    expect(logo).toBeTruthy();
  });

  it('should have username and password inputs with correct testIDs', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should have correct icons for username and password inputs', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameIcon = getByTestId('left-icon-user')
    expect(usernameIcon.props.name).toBe('user');

    const passwordIcon = getByTestId('left-icon-lock')
    expect(passwordIcon.props.name).toBe('lock');
  });

  it('should display an error message when invalid credentials are submitted', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    fireEvent.changeText(usernameInput, 'user');
    fireEvent.changeText(passwordInput, '1234');

    const loginButton = getByTestId('button-login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorContainer = getByTestId('error-container');
      expect(errorContainer).toBeTruthy();
      expect(getByText('Credenciais inválidas')).toBeTruthy();
    });
  });

  it('should display an error message when "Password must be at least 3 characters long" when less than 3 characters are entered', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(usernameInput, 'user');
      fireEvent.changeText(passwordInput, '1');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByText('A senha deve ter no mínimo 3 caracteres')).toBeTruthy();
    });
  });

  it('should display an error message when "The password must be numeric" when letters or symbols are entered, instead of numbers', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(usernameInput, 'user');
      fireEvent.changeText(passwordInput, 'abc');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByText('A senha deve ser numérica')).toBeTruthy();
    });
  });

  it('should display an error message when "Username must be at least 3 characters long" when less than 3 characters are entered', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(usernameInput, 'u');
      fireEvent.changeText(passwordInput, '1234');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByText('O usuário deve ter no mínimo 3 caracteres')).toBeTruthy();
    });
  });

  it('should login successfully when username and password are correct', async () => {
    (useNetworkStatus as jest.Mock).mockReturnValue(true);
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');

    await act(async () => {
      fireEvent.changeText(usernameInput, 'user');
      fireEvent.changeText(passwordInput, '123');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    expect(loginMock).toHaveBeenCalled();

    const errorContainer = queryByTestId('error-container');
    expect(errorContainer).toBeNull();
  });

  it('should display an error message when there is no internet connection', async () => {
    (useNetworkStatus as jest.Mock).mockReturnValue(false);

    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');

    await act(async () => {
      fireEvent.changeText(usernameInput, 'user');
      fireEvent.changeText(passwordInput, '123');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    expect(getByText('Sem conexão com a internet')).toBeTruthy();
  });

  it('should clear the error message after 4000ms', async () => {
    const { getByTestId, queryByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <SignInPage />
      </ThemeProvider>
    );

    const usernameInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(usernameInput, 'user');
      fireEvent.changeText(passwordInput, '1234');

      const loginButton = getByTestId('button-login');
      fireEvent.press(loginButton);
    });

    expect(getByText('Credenciais inválidas')).toBeTruthy();


    act(() => {
      jest.advanceTimersByTime(4000);
    });


    await waitFor(() => {
      const errorContainer = queryByTestId('error-container');
      expect(errorContainer).toBeNull();
    });
  });
});