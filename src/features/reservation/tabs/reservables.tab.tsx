import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import ReservationsCards from '../../../components/cards/reservations.cards';
import { GlobalColors } from '../../../theme/global.colors';
import { ReservationTabParams } from '../reservation.types';
import { RoboSemiBoldText } from '../../../components';
import React from 'react';

interface ReservablesTabProps {
  route: {
    params?: ReservationTabParams;
  };
}

const { height } = Dimensions.get('window');

const ReservablesTab = ({ route }: any) => {
  const zones = route.params?.zones ?? [];

  return (
    <View style={{...styles.mainContainer}}>
      <TouchableOpacity style={{...styles.myReservationsButton}}>
        <RoboSemiBoldText style={{...styles.myReservationsText}} size={15}>
          Ver mis reservas (0)
        </RoboSemiBoldText>
      </TouchableOpacity>
      <FlatList
        data={zones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReservationsCards data={item} />
        )}
        contentContainerStyle={{
          width: '100%',
          paddingVertical: 10,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default ReservablesTab;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingTop: 6,
    alignItems: 'center',
    backgroundColor: GlobalColors.white,
  },
  myReservationsButton:{
    width: '90%', 
    borderWidth: 1,
    borderRadius: 15, 
    marginVertical: 8, 
    alignItems: 'center', 
    height: height * 0.05,
    justifyContent: 'center',
    borderColor: GlobalColors.gray5,
  },
  myReservationsText:{
    alignSelf: 'center',
    color: GlobalColors.navyDeep, 
  },
});
