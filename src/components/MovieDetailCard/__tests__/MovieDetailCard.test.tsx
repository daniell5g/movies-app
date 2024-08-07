import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import MovieDetailCard from '../index';

describe('Component: MovieDetailCard', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ThemeProvider theme={themes.default}>
        <MovieDetailCard
          iconName="star"
          title="Avaliação"
          subtitle="8.5"
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the text with styles correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <MovieDetailCard
          iconName="dollar-sign"
          title="Faturamento"
          subtitle="1.000.000,00"
        />
      </ThemeProvider>
    );

    const title = getByText('Faturamento');
    const titleStyle = title.props.style;
    expect(titleStyle).toEqual(expect.objectContaining({
      fontSize: 14,
      fontFamily: themes.default.fonts.medium,
      textTransform: 'uppercase',
      color: themes.default.colors.secondary
    }));
  });

  it('should render the title correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <MovieDetailCard
          iconName="dollar-sign"
          title="Faturamento"
          subtitle="1.000.000,00"
        />
      </ThemeProvider>
    );

    const title = getByText('Faturamento');
    expect(title).toBeTruthy();
  });

  it('should render the subtitle correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <MovieDetailCard
          iconName="star"
          title="Avaliação"
          subtitle="800"
        />
      </ThemeProvider>
    );

    const subtitle = getByText('800');
    expect(subtitle).toBeTruthy();
  });
});
