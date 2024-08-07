import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from 'styled-components/native'

import { AppLoading } from './components/AppLoading';
import { useThemeSwitcher } from './hooks/useThemeSwitcher'
import { Routes } from './navigation';

export default function App() {
  const { theme } = useThemeSwitcher()

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView >
  )
}
