import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { GlobalColors } from '../../theme/global.colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoboExtraBoldText, RoboRegularText, RoboSemiBoldText } from '../../components';

const ReservationsScreen = () => {
  //Aquí debe mostrar

  const dataDummie = {
    reservations: [
      {
        id: 1,
        name: 'kiosko',
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
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.white} />
      <SafeAreaView style={{ ...styles.safeareaContainer }} edges={['top', 'left', 'right']}>
        <View style={{ ...styles.mainContainer }}>
          <View style={{...styles.titleContainer}}>
            <RoboExtraBoldText  adjustsFontSizeToFit numberOfLines={1} size={25} style={{...styles.titleText}}>
              Zonas comunes y reservables
            </RoboExtraBoldText>
            <RoboRegularText size={15} numberOfLines={2} style={{...styles.subtitleText}}>
              Encuentra todos los lugares disponibles para tus actividades
            </RoboRegularText>
          </View>
          <View style={{...styles.contentContainer}}>
            <View style={{...styles.reservationsContainer}}>
              <View style={{ width: '90%', height: '15%', borderWidth: 1, borderColor: 'red', alignSelf: 'center', justifyContent: 'center'}}>
                <RoboSemiBoldText size={18} style={{color: 'black', marginLeft: '5%'}}>
                  Zonas reservables
                </RoboSemiBoldText>
              </View>
              <View style={{ width: '100%', height: '85%', borderWidth: 1, borderColor: 'red'}}>

              </View>
            </View>
            <View style={{...styles.commonsContainer}}>
                            <View style={{ width: '90%', height: '15%', borderWidth: 1, borderColor: 'red', alignSelf: 'center', justifyContent: 'center'}}>
                <RoboSemiBoldText size={18} style={{color: 'black', marginLeft: '5%'}}>
                  Zonas comunes
                </RoboSemiBoldText>
              </View>
              <View style={{ width: '100%', height: '85%', borderWidth: 1, borderColor: 'red'}}>

              </View>

            </View>
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
  titleText:{
    alignSelf: 'center', 
    color: 'black' 
  },
  subtitleText:{
    alignSelf: 'center',
    marginTop: '3%',
    color: GlobalColors.black3,
    alignItems: 'center',
    textAlign: 'center',
    width: '90%',
  },
  contentContainer: {
    width: '100%', 
    flex: 8.5, 
    borderWidth: 1,
  },
  reservationsContainer: {
    width: '100%', 
    height: '50%'
  },



  commonsContainer: {
    width: '100%', 
    height: '50%', 
    borderWidth: 1, 
    borderColor: 'purple',
    },
});
