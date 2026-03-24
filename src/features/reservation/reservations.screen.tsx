import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RoboExtraBoldText, RoboRegularText } from '../../components';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReservationZonesByType } from './reservation.types';
import { GlobalColors } from '../../theme/global.colors';
import ReservablesTab from './tabs/reservables.tab';
import CommonsTab from './tabs/commons.tab';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const dataDummie: ReservationZonesByType = {
  reservations: [
    {
      id: 1,
      name: 'kiosko asd asd asd',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
    {
      id: 2,
      name: 'Sala de reuniones',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
    {
      id: 3,
      name: 'Zona BBQ',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
    {
      id: 4,
      name: 'Salón de eventos',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    }
  ],
  commons: [
    {
      id: 1,
      name: 'Psicina',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
    {
      id: 2,
      name: 'Sala de juegos',
      hasform: false,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
    {
      id: 3,
      name: 'Gimnasio',
      hasform: false,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    },
  ],
};

const ReservationsScreen = () => {
  const reservablesCount = dataDummie.reservations.length;
  const commonsCount = dataDummie.commons.length;

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.white} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} size={25} style={styles.titleText}>
              Zonas comunes y reservables
            </RoboExtraBoldText>
            <RoboRegularText size={15} numberOfLines={2} style={styles.subtitleText}>
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
                  backgroundColor: GlobalColors.white,
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
                initialParams={{ zones: dataDummie.reservations }}
                options={{
                  tabBarLabel: ({ color }) => (
                    <View style={styles.tabLabelContainer}>
                      <Text style={[styles.tabLabelText, { color }]}>Reservables</Text>
                      <View style={[styles.badge, { backgroundColor: GlobalColors.navyDeep }]}>
                        <Text style={styles.badgeText}>{reservablesCount}</Text>
                      </View>
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Comunes"
                component={CommonsTab}
                initialParams={{ zones: dataDummie.commons }}
                options={{
                  tabBarLabel: ({ color }) => (
                    <View style={styles.tabLabelContainer}>
                      <Text style={[styles.tabLabelText, { color }]}>Comunes</Text>
                      <View style={[styles.badge, { backgroundColor: GlobalColors.navyDeep }]}>
                        <Text style={styles.badgeText}>{commonsCount}</Text>
                      </View>
                    </View>
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
    backgroundColor: GlobalColors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    alignSelf: 'center',
    color: 'black',
  },
  subtitleText: {
    alignSelf: 'center',
    marginTop: '3%',
    color: GlobalColors.black3,
    alignItems: 'center',
    textAlign: 'center',
    width: '90%',
  },
  tabsContainer: {
    flex: 8.5,
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabelText: {
    fontSize: 13,
    fontFamily: 'Roboto-SemiBold',
  },
  badge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: GlobalColors.white,
    fontSize: 11,
    fontFamily: 'Roboto-Bold',
  },
});
