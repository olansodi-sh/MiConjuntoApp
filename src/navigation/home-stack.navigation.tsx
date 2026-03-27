import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabsNavigation from './bottom-tabs.navigation';
import SupportScreen from '../features/support/support.screen';
import ShowZoneDetailsScreen from '../features/zonedetail/show-zone-details.screen';
import CreateZoneReservationScreen from '../features/createreservation/create-zone-reservation.screen';
import { ReservationZone } from '../features/reservation/reservation.types';

import NoticeDetailScreen from '../features/home/notice-detail.screen';
import { News } from '../features/home/types/news.types';

export type HomeStackParamList = {
  BottomTabsNavigation: undefined;
  SupportScreen: undefined;
  ShowZoneDetailsScreen: { zone: ReservationZone; isReservable: boolean };
  CreateZoneReservationScreen: { zone: ReservationZone };
  NoticeDetailScreen: { notice: News };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabsNavigation"
        component={BottomTabsNavigation}
      />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen
        name="ShowZoneDetailsScreen"
        component={ShowZoneDetailsScreen}
      />
      <Stack.Screen
        name="CreateZoneReservationScreen"
        component={CreateZoneReservationScreen}
      />
    <Stack.Screen
        name="NoticeDetailScreen"
        component={NoticeDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
