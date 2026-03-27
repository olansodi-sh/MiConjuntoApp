
import { View, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import { GlobalColors } from '../../theme/global.colors';
import ZoneDetailComponent from '../reservation/components/zone-detail.component';
import { RoboSemiBoldText } from '../../components';

const { width } = Dimensions.get('window');

type ZoneDetailRouteProp = RouteProp<HomeStackParamList, 'ShowZoneDetailsScreen'>;

const ShowZoneDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ZoneDetailRouteProp>();
  const { zone, isReservable } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReserve = () => {
    navigation.navigate('CreateZoneReservationScreen', { zone });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Detail Component */}
      <ZoneDetailComponent 
        zone={zone} 
        isReservable={isReservable} 
        onBack={handleBack}
        onReserve={handleReserve}
      />

      {/* Persistent Bottom Button if Reservable */}
      {isReservable && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.reserveButton} 
            activeOpacity={0.85}
            onPress={handleReserve}
          >
            <RoboSemiBoldText size={16} style={styles.reserveButtonText}>
              Reservar ahora
            </RoboSemiBoldText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ShowZoneDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: GlobalColors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  reserveButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: GlobalColors.navyDeep,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  reserveButtonText: {
    color: GlobalColors.white,
    letterSpacing: 0.5,
  },
});
