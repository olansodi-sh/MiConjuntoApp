import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { RoboExtraBoldText, RoboRegularText } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalColors } from '../../theme/global.colors';
import ReservablesTab from './tabs/reservables.tab';
import CommonsTab from './tabs/commons.tab';
import { useZonesStore } from './store/zones.store';
import React, { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

const { height } = Dimensions.get('window');

interface TabLabelProps {
  color: string;
  count: number;
  label: string;
}

const TabLabel = ({ color, count, label }: TabLabelProps) => (
  <View style={styles.tabLabelContainer}>
    <Text style={[styles.tabLabelText, { color }]}>
      {label}
    </Text>
    <View
      style={[
        styles.badge,
        { backgroundColor: GlobalColors.navyDeep },
      ]}
    >
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  </View>
);

const ReservationsScreen = () => {
  const { fetchZones, reservableZones, commonZones } = useZonesStore();

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  const reservablesCount = reservableZones.length;
  const commonsCount = commonZones.length;

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
      <SafeAreaView
        style={styles.safeareaContainer}
        edges={['top', 'left', 'right']}
      >
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <RoboExtraBoldText
              adjustsFontSizeToFit
              numberOfLines={1}
              size={25}
              style={styles.titleText}
            >
              Zonas comunes y reservables
            </RoboExtraBoldText>
            <RoboRegularText
              size={15}
              numberOfLines={2}
              style={styles.subtitleText}
            >
              Encuentra todos los lugares disponibles para tus actividades
            </RoboRegularText>
          </View>

          <View style={styles.tabsContainer}>
            <Tab.Navigator
              screenOptions={{
                swipeEnabled: false,
                tabBarActiveTintColor: GlobalColors.navyDeep,
                tabBarInactiveTintColor: GlobalColors.gray2,
                tabBarIndicatorStyle: {
                  backgroundColor: GlobalColors.navyDeep,
                  height: 3,
                  borderRadius: 2,
                },
                tabBarStyle: {
                  backgroundColor: GlobalColors.cream,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: GlobalColors.gray5,
                },
                tabBarLabelStyle: {
                  fontSize: 13,
                  fontFamily: 'Roboto-SemiBold',
                  textTransform: 'none',
                },
                tabBarPressColor: GlobalColors.blueSoft,
              }}
            >
              <Tab.Screen
                name="Reservables"
                component={ReservablesTab}
                options={{
                  tabBarLabel: ({ color }) => (
                    <TabLabel color={color} count={reservablesCount} label="Reservables" />
                  ),
                }}
              />
              <Tab.Screen
                name="Comunes"
                component={CommonsTab}
                options={{
                  tabBarLabel: ({ color }) => (
                    <TabLabel color={color} count={commonsCount} label="Comunes" />
                  ),
                }}
              />
            </Tab.Navigator>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  titleContainer: {
    flex: 1.5,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: GlobalColors.navyDeep,
    alignSelf: 'center',
  },
  subtitleText: {
    width: '90%',
    marginTop: '3%',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: GlobalColors.charcoalSoft,
  },
  tabsContainer: {
    flex: 8.5,
  },
  tabLabelContainer: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLabelText: {
    fontSize: 13,
    fontFamily: 'Roboto-SemiBold',
  },
  badge: {
    minWidth: 20,
    borderRadius: 10,
    height: height * 0.02,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    color: GlobalColors.white,
    fontFamily: 'Roboto-Bold',
  },
});
