import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomTabsNavigation from "./bottom-tabs.navigation";
import SupportScreen from "../features/support/support.screen";

export type HomeStackParamList = {
  BottomTabsNavigation: undefined;
  SupportScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabsNavigation"
        component={BottomTabsNavigation}
      />
      <Stack.Screen name='SupportScreen' component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
