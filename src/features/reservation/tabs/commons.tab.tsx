
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import ReservationsCards from '../../../components/cards/reservations.cards';
import { GlobalColors } from '../../../theme/global.colors';
import { RoboSemiBoldText } from '../../../components';
import { useZonesStore } from '../store/zones.store';
import React from 'react';
import { Zone } from '../types/zones.types';

const { height } = Dimensions.get('window');

const CommonsTab = () => {
  const { commonZones, isLoading, fetchZones } = useZonesStore();

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.myReservationsButton}>
        <RoboSemiBoldText style={styles.myReservationsText} size={15}>
          Ver mis reservas (0)
        </RoboSemiBoldText>
      </TouchableOpacity>
      <FlatList
        data={commonZones}
        keyExtractor={(item: Zone) => item.id.toString()}
        renderItem={({ item }: { item: Zone }) => (
          <ReservationsCards data={item} />
        )}
        onRefresh={fetchZones}
        refreshing={isLoading}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default CommonsTab;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingTop: 6,
    alignItems: 'center',
    backgroundColor: GlobalColors.cream,
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
  listContent: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  }
});
