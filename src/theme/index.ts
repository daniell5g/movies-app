import colorBlind from 'color-blind';

type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  green: string;
};

type Fonts = {
  regular: string;
  medium: string;
  bold: string;
  secondaryRegular: string;
  secondaryMedium: string;
  secondaryBold: string;
};

const defaultColors: Colors = {
  primary: '#EC8B00',
  secondary: '#FFFFFF',
  tertiary: '#2E2F33',
  neutral: '#16171B',
  green: '#21D07A',
};

const defaultFonts: Fonts = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  bold: 'Nunito_700Bold',
  secondaryRegular: 'Roboto_400Regular',
  secondaryMedium: 'Roboto_500Medium',
  secondaryBold: 'Roboto_700Bold',
};

export const themes = {
  default: {
    colors: defaultColors,
    fonts: defaultFonts,
  },
  protanopia: {
    colors: {
      primary: colorBlind.protanopia(defaultColors.primary),
      secondary: colorBlind.protanopia(defaultColors.secondary),
      tertiary: colorBlind.protanopia(defaultColors.tertiary),
      neutral: colorBlind.protanopia(defaultColors.neutral),
      green: colorBlind.protanopia(defaultColors.green),
    },
    fonts: defaultFonts,
  },
  deuteranopia: {
    colors: {
      primary: colorBlind.deuteranopia(defaultColors.primary),
      secondary: colorBlind.deuteranopia(defaultColors.secondary),
      tertiary: colorBlind.deuteranopia(defaultColors.tertiary),
      neutral: colorBlind.deuteranopia(defaultColors.neutral),
      green: colorBlind.deuteranopia(defaultColors.green),
    },
    fonts: defaultFonts,
  },
  tritanopia: {
    colors: {
      primary: colorBlind.tritanopia(defaultColors.primary),
      secondary: colorBlind.tritanopia(defaultColors.secondary),
      tertiary: colorBlind.tritanopia(defaultColors.tertiary),
      neutral: colorBlind.tritanopia(defaultColors.neutral),
      green: colorBlind.tritanopia(defaultColors.green),
    },
    fonts: defaultFonts,
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.default;
