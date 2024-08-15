import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ConfigAccessibilityPage } from '../pages/ConfigAccessibilityPage';
import { SignInPage } from '../pages/SignInPage';
import { SplashPage } from '../pages/SplashPage';

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
      <Screen name="ConfigAccessibilityPage" component={ConfigAccessibilityPage} />
      <Screen name="SignInPage" component={SignInPage} />
    </Navigator>
  )
}