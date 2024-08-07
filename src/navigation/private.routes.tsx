import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DetailsPage } from 'src/pages/DetailsPage';
import { FavoritePage } from 'src/pages/FavoritePage';
import { HomePage } from 'src/pages/HomePage';
import { SettingsPage } from 'src/pages/SettingsPage';

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