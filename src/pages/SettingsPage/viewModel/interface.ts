import type { ThemeName, ThemeType } from '../../../theme';

export interface ISettingsViewModel {
  options: {
    label: string;
    value: string;
  }[]
  selected: ThemeName
  theme: ThemeType
  setSelected: React.Dispatch<React.SetStateAction<ThemeName>>
  handleChange: () => Promise<void>
}