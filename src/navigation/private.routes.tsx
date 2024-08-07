import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomePage } from 'src/pages/HomePage';

const { Navigator, Screen } = createNativeStackNavigator();

export const PrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='HomePage'
    >
      <Screen name="HomePage" component={HomePage} />
    </Navigator>
  )
}