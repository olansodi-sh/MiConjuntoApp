import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RoboExtraBoldText, RoboRegularText } from '../../components';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalColors } from '../../theme/global.colors';
import EntriesTab from './tabs/entries.tab';
import PackagesTab from './tabs/packages.tab';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const ReceptionScreen = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} size={25} style={styles.titleText}>
              Paquetes e ingresos
            </RoboExtraBoldText>
            <RoboRegularText size={15} numberOfLines={2} style={styles.subtitleText}>
              Consulta tus paquetes pendientes y el historial de ingresos al conjunto
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
                name="Paquetes"
                component={PackagesTab}
                options={{
                  tabBarLabel: ({ color }) => (
                    <View style={styles.tabLabelContainer}>
                      <Text style={[styles.tabLabelText, { color }]}>Paquetes</Text>
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Ingresos"
                component={EntriesTab}
                options={{
                  tabBarLabel: ({ color }) => (
                    <View style={styles.tabLabelContainer}>
                      <Text style={[styles.tabLabelText, { color }]}>Ingresos</Text>
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

export default ReceptionScreen;

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
    width: '90%',
    alignSelf: 'center',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    alignSelf: 'center',
    color: GlobalColors.navyDeep,
  },
  subtitleText: {
    alignSelf: 'center',
    marginTop: '3%',
    color: GlobalColors.charcoalSoft,
    textAlign: 'center',
    width: '90%',
  },
  tabsContainer: {
    flex: 8.5,
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLabelText: {
    fontSize: 13,
    fontFamily: 'Roboto-SemiBold',
  },
});
