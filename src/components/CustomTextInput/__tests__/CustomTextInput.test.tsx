import '@testing-library/react-native/extend-expect';

import { fireEvent, render, } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import CustomTextInput from '../index';

describe('Component: CustomTextInput', () => {
  it('should render correctly container main', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label='Usuário' />
      </ThemeProvider>
    );
    expect(getByTestId('container-input-custom')).toMatchSnapshot()
  });

  it('should render correctly label', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label='Usuário' />
      </ThemeProvider>
    );
    expect(getByTestId('label-input-custom')).toBeTruthy();
  });

  it('should render correctly input', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label='Usuário' />
      </ThemeProvider>
    );

    expect(getByTestId('input-text-custom')).toBeTruthy();
  });

  it('should render correctly label', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label='Usuário' leftIcon='user' />
      </ThemeProvider>
    );

    expect(getByText('Usuário')).toBeTruthy();
  });

  it('should apply secureTextEntry when isPassword is true', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label="Senha" isPassword={true} />
      </ThemeProvider>
    );

    const input = getByTestId('input-text-custom');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should not apply secureTextEntry when isPassword is false', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label="Senha" isPassword={false} />
      </ThemeProvider>
    );
    const input = getByTestId('input-text-custom');

    expect(input.props.secureTextEntry).toBe(false);
  });

  it('should show label as filled when the input has text', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <CustomTextInput label="Usuário" />
      </ThemeProvider>
    );

    const input = getByTestId('input-text-custom');
    const label = getByTestId('label-input-custom');

    fireEvent.changeText(input, 'user');
    fireEvent(input, 'focus')
    expect(label).toHaveStyle({ color: themes.default.colors.primary });
  });
});