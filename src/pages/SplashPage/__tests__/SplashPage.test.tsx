import { useNavigation } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import { themes } from '../../../theme';
import { SplashPage } from '../index';

jest.mock('@react-navigation/native');
jest.mock('../../../libs/storage/async-storage');

describe('SplashPage Tests', () => {
  const navigateMock = jest.fn();
  const getItemMock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
    (AsyncStorageImpl.prototype.getItem as jest.Mock).mockImplementation(getItemMock);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should navigate to ConfigAccessibilityPage if accessibility config is null', async () => {
    getItemMock.mockResolvedValueOnce(null);

    render(
      <ThemeProvider theme={themes.default}>
        <SplashPage />
      </ThemeProvider>
    );

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('ConfigAccessibilityPage');
    });
  });

  it('should navigate to SignInPage if accessibility config exists', async () => {
    getItemMock.mockResolvedValueOnce('default');

    render(
      <ThemeProvider theme={themes.default}>
        <SplashPage />
      </ThemeProvider>
    );

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('SignInPage');
    });
  });
});
