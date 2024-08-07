import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SplashPage } from 'src/pages/SplashPage';

const { Navigator, Screen } = createNativeStackNavigator();

export const PublicRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='SplashPage'
    >
      <Screen name="SplashPage" component={SplashPage} />
    </Navigator>
  )
}