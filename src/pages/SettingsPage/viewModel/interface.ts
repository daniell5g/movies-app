import type { ThemeName, ThemeType } from '../../../theme';

export interface ISettingsViewModel {
  selected: ThemeName
  theme: ThemeType
  setSelected: React.Dispatch<React.SetStateAction<ThemeName>>
  handleChange: () => Promise<void>
}