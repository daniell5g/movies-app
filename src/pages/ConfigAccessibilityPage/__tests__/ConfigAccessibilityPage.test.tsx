import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import { ConfigAccessibilityPage } from '../';

describe('ConfigAccessibilityPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <ConfigAccessibilityPage />
      </ThemeProvider>
    );

    expect(getByText('Configurações de Acessibilidade')).toBeTruthy();
    expect(
      getByText('Antes de continuar, precisamos ajustar o aplicativo para proporcionar a melhor experiência possível para você.')
    ).toBeTruthy();
    expect(getByText('Se você possui alguma deficiência visual, por favor, selecione a opção que melhor descreve sua condição.')).toBeTruthy();
  });

  it('displays "Desejo pular" when no option is selected', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <ConfigAccessibilityPage />
      </ThemeProvider>
    );

    expect(getByText('Desejo pular')).toBeTruthy();
  });

  it('when clicking on the picker select there should be the option Protanopia and Deuteranopia', () => {
    const { toJSON, getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <ConfigAccessibilityPage />
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

  it('should have the correct initial background color (#EC8B00)', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <ConfigAccessibilityPage />
      </ThemeProvider>
    );

    const button = getByTestId('button-config-accessibility');
    expect(button.props.style.backgroundColor).toBe('#EC8B00');
  });
});
