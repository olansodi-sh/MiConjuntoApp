import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { RoboExtraBoldText, RoboRegularText } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReservationZonesByType } from './reservation.types';
import { GlobalColors } from '../../theme/global.colors';
import ReservablesTab from './tabs/reservables.tab';
import CommonsTab from './tabs/commons.tab';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const dataDummie: ReservationZonesByType = {
  reservations: [
    {
      id: 1,
      name: 'Kiosko',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      rules: [
        'No se permiten bebidas alcohólicas',
        'No se permiten alimentos',
      ],
    }
  ],
  commons: [
    {
      id: 1,
      name: 'Piscina',
      hasform: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
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
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
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
    height: height*0.02,
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
