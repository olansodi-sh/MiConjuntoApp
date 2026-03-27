import { View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import { RoboExtraBoldText, RoboRegularText } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalColors } from '../../theme/global.colors';
import { RouteProp } from '@react-navigation/native';
import ZoneReservationComponent from '../reservation/components/zone.reservation.component';
import React from 'react';

type CreateZoneReservationRouteProp = RouteProp<HomeStackParamList, 'CreateZoneReservationScreen'>;
type CreateZoneReservationNavProp = StackNavigationProp<HomeStackParamList, 'CreateZoneReservationScreen'>;

interface CreateZoneReservationScreenProps {
  route: CreateZoneReservationRouteProp;
  navigation: CreateZoneReservationNavProp;
}

const CreateZoneReservationScreen = ({ route, navigation }: CreateZoneReservationScreenProps) => {
  const { zone } = route.params;

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.white} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
              <RoboExtraBoldText size={22} style={styles.backArrow}>{'‹'}</RoboExtraBoldText>
              <RoboRegularText size={15} style={styles.backText}>Atrás</RoboRegularText>
            </TouchableOpacity>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} size={22} style={styles.titleText}>
              Nueva solicitud
            </RoboExtraBoldText>
          </View>

          <ZoneReservationComponent 
            zone={zone}
            onSuccess={() => navigation.navigate('BottomTabsNavigation', { screen: 'ReservationsScreen' } as any)}
            onCancel={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default CreateZoneReservationScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backArrow: {
    color: GlobalColors.navyDeep,
    lineHeight: 26,
  },
  backText: {
    color: GlobalColors.navyDeep,
  },
  titleText: {
    color: GlobalColors.navyDeep,
    flex: 1,
  },
});
