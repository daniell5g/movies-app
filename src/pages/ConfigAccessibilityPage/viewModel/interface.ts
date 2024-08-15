import type { ThemeName } from 'src/theme'

export interface IConfigAccessibilityViewModel {
  selected: ThemeName
  options: {
    label: string;
    value: string;
  }[]
  setSelected: React.Dispatch<React.SetStateAction<ThemeName>>
  handleChange: () => Promise<void>
}