import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../features/home/home.screen";
import ProfileScreen from "../features/profile/profile.screen";
import ReservationsScreen from "../features/reservation/reservations.screen";
import PackagesDeliveryScreen from "../features/packagedelivery/packages-delivery.screen";


export type BottomTabParamList = {
  HomeScreen: undefined;
  ReservationsScreen: undefined;
  ProfileScreen: undefined;
  PackagesDeliveryScreen: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ReservationsScreen" component={ReservationsScreen} />
      <Tab.Screen name="PackagesDeliveryScreen" component={PackagesDeliveryScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
