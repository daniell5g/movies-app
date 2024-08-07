import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

import { THEME_KEY } from '../configs/constants'
import themes from '../theme'

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useState(themes.default)

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY)
      if (storedTheme && themes[storedTheme]) {
        setTheme(themes[storedTheme])
      }
    }
    loadTheme()
  }, [])

  const changeTheme = async (newTheme: string) => {
    if (themes[newTheme]) {
      setTheme(themes[newTheme])
      await AsyncStorage.setItem(THEME_KEY, newTheme)
    }
  }

  return { theme, changeTheme }
}
