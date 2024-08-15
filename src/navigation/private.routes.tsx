import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { DetailsPage } from '../pages/DetailsPage';
import { FavoritePage } from '../pages/FavoritePage';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';

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
      <Screen name="DetailsPage" component={DetailsPage} />
      <Screen name="FavoritePage" component={FavoritePage} />
      <Screen name="SettingsPage" component={SettingsPage} />
    </Navigator>
  )
}