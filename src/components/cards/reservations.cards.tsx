import { View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import RoboExtraBoldText from '../texts/robo-extrabold.text';
import { GlobalColors } from '../../theme/global.colors';
import RoboBoldText from '../texts/robo-bold.text';
import React from 'react';

const { width, height } = Dimensions.get('window');

const ReservationsCards = ({ data }: any) => {
  return (
    <View style={{...style.cardContainer}}>
      <View style={{...style.imageContainer}}>
        <Image source={{ uri: data.image }} style={{ width: '100%', height: '100%' }} resizeMode="contain"/>
      </View>
      <View style={{...style.infoContainer}}>
        <View style={{...style.titleContainer}}>
          <RoboBoldText adjustsFontSizeToFit numberOfLines={2} style={{...style.titleText}} size={16}>
            {data.name}
          </RoboBoldText>
        </View>
        <View style={{...style.containerButtons}}>
          <TouchableOpacity activeOpacity={0.8} style={{...style.showDetailsButton}}>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} style={{...style.showDetailsText}} size={14}>
              Ver detalles
            </RoboExtraBoldText>
          </TouchableOpacity>
          <TouchableOpacity style={{...style.reservationButton}}>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} style={{...style.reservationText}} size={14}>
              Reservar
            </RoboExtraBoldText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReservationsCards;

const style = StyleSheet.create({
  cardContainer: {
		borderWidth: 1,
    borderRadius: 15,
    marginVertical: 8,
    width: width * 0.9,
    height: height * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: GlobalColors.gray5,
  },
	imageContainer: {
		width: '45%',
		height: '100%',
	},
	infoContainer: {
		width: '45%', 
		height: '100%',
	},
	titleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%', height: '30%',
	},
	titleText:{
		alignSelf: 'center',
		color: GlobalColors.navyDeep,
	},
	containerButtons: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
	showDetailsButton: {
		width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: height * 0.05,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: GlobalColors.gray5,
    backgroundColor: GlobalColors.blueSoftV2,
	},
	showDetailsText: {
		alignSelf: 'center',
		color: GlobalColors.navyDeep,
	},
	reservationButton: {
		width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: height * 0.05,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: GlobalColors.gray5,
    backgroundColor: GlobalColors.greenSoft,
	},
	reservationText:{
		alignSelf: 'center',
		color: GlobalColors.navyDeep,
	},
});
