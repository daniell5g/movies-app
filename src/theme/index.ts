import colorBlind from 'color-blind'

const defaultColors = {
  primary: '#EC8B00',
  secondary: '#FFFFFF',
  tertiary: '#2E2F33',
  neutral: '#16171B',
}

const themes = {
  default: {
    colors: defaultColors,
  },
  protanopia: {
    colors: {
      primary: colorBlind.protanopia(defaultColors.primary),
      secondary: colorBlind.protanopia(defaultColors.secondary),
      tertiary: colorBlind.protanopia(defaultColors.tertiary),
      neutral: colorBlind.protanopia(defaultColors.neutral),
    },
  },
  deuteranopia: {
    colors: {
      primary: colorBlind.deuteranopia(defaultColors.primary),
      secondary: colorBlind.deuteranopia(defaultColors.secondary),
      tertiary: colorBlind.deuteranopia(defaultColors.tertiary),
      neutral: colorBlind.deuteranopia(defaultColors.neutral),
    },
  },
  tritanopia: {
    colors: {
      primary: colorBlind.tritanopia(defaultColors.primary),
      secondary: colorBlind.tritanopia(defaultColors.secondary),
      tertiary: colorBlind.tritanopia(defaultColors.tertiary),
      neutral: colorBlind.tritanopia(defaultColors.neutral),
    },
  },
}

export default themes
