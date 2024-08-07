import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import { useThemeSwitcher } from './hooks/useThemeSwitcher'

export default function App() {
  const { theme } = useThemeSwitcher()

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={{ color: theme.colors.primary }}>
          BRQ Movies
        </Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
