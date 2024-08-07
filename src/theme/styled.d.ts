import 'styled-components'

declare module 'styled-components' {
  type ThemeType = typeof themes
  export interface DefaultTheme extends ThemeType { }
}
