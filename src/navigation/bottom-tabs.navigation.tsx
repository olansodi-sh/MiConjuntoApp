import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalColors } from "../theme/global.colors";
import React from "react";
import HomeScreen from "../features/home/home.screen";
import ProfileScreen from "../features/profile/profile.screen";
import ReservationsScreen from "../features/reservation/reservations.screen";
import ReceptionScreen from "../features/reception/reception.screen";


export type BottomTabParamList = {
  HomeScreen: undefined;
  ReservationsScreen: undefined;
  ProfileScreen: undefined;
  ReceptionScreen: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalColors.navyDeep,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: GlobalColors.cream,
        tabBarInactiveTintColor: GlobalColors.slateBlue,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Roboto-Medium',
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: 'Noticias' }} />
      <Tab.Screen name="ReservationsScreen" component={ReservationsScreen} options={{ tabBarLabel: 'Zonas' }} />
      <Tab.Screen name="ReceptionScreen" component={ReceptionScreen} options={{ tabBarLabel: 'Portería' }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
