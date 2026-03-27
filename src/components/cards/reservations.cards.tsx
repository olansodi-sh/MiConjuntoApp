import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import { GlobalColors } from '../../theme/global.colors';
import RoboBoldText from '../texts/robo-bold.text';
import RoboSemiBoldText from '../texts/robo-semibold.text';
import RoboRegularText from '../texts/robo-regular.text';
import React from 'react';

type CardNavProp = StackNavigationProp<HomeStackParamList>;

const { width, height } = Dimensions.get('window');

const ReservationsCards = ({ data, showReserveButton = false }: any) => {
  const navigation = useNavigation<CardNavProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('ShowZoneDetailsScreen', {
          zone: data,
          isReservable: showReserveButton,
        })
      }
    >
      <Image
        source={require('../../../public/images/loginBackground.png')}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <RoboBoldText numberOfLines={2} style={styles.titleText} size={15}>
          {data.name}
        </RoboBoldText>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.detailsButton}
            onPress={() =>
              navigation.navigate('ShowZoneDetailsScreen', {
                zone: data,
                isReservable: showReserveButton,
              })
            }
          >
            <RoboSemiBoldText size={13} style={styles.detailsText}>
              Ver detalles
            </RoboSemiBoldText>
          </TouchableOpacity>

          {showReserveButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.reserveButton}
              onPress={() =>
                navigation.navigate('CreateZoneReservationScreen', {
                  zone: data,
                })
              }
            >
              <RoboSemiBoldText size={13} style={styles.reserveText}>
                Reservar
              </RoboSemiBoldText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationsCards;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    marginVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: GlobalColors.white,
    borderWidth: 1,
    borderColor: GlobalColors.marbleGray,
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '38%',
    minHeight: height * 0.1,
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  titleText: {
    color: GlobalColors.navyDeep,
    lineHeight: 20,
    marginBottom: 10,
  },
  buttonsContainer: {
    gap: 8,
  },
  detailsButton: {
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 7,
    borderColor: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.white,
  },
  detailsText: {
    color: GlobalColors.navyDeep,
  },
  reserveButton: {
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 7,
    backgroundColor: GlobalColors.navyDeep,
  },
  reserveText: {
    color: GlobalColors.white,
  },
});
