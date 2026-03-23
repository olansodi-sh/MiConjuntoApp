import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomTabsNavigation from "./bottom-tabs.navigation";

export type HomeStackParamList = {
  BottomTabsNavigation: undefined;
  CartScreen: undefined;
  CartConfirmScreen: undefined;
  SuccessScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabsNavigation"
        component={BottomTabsNavigation}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
