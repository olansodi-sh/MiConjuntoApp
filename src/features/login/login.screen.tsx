import { View, Text, StatusBar, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native'
import React from 'react'
import { GlobalColors } from '../../theme/global.colors'
import useSafeAreaSize from '../../hooks/useSafeAreaSize.hook'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Dimensions} from 'react-native';
import { RoboBoldText, RoboRegularText } from '../../components'
import MainButton from '../../components/buttons/main.button'
import MainInput from '../../components/inputs/main.input'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LoginScreen = () => {

  const { layoutScreen, onLayout } = useSafeAreaSize()

  return (
    <React.Fragment>
      <StatusBar  backgroundColor={'transparent'} barStyle={'dark-content'} />
      <SafeAreaView style={{...styles.safeareaContainer}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{...styles.keyboardContainer}} onLayout={onLayout}>
          <View style={{...styles.contentContainer}}>
            {/* top */}
            <View style={{width: windowWidth, height: windowHeight * 0.40, flexShrink: 1, backgroundColor:'red' }}>
              <Image blurRadius={0.9} resizeMode="cover" source={require('../../../public/images/loginBackground.png')}  style={{width: '100%', height: '100%'}} />
            </View>
            {/* bottom */}
            <View style={{...styles.bottomSection }}>

              <View style={{width:'100%', height:'27%', alignItems: 'center', justifyContent: 'center'}}>
                <RoboBoldText size={25} style={{alignSelf: 'center', color: 'black'}}>
                  ¡Bienvenido de nuevo!
                </RoboBoldText>
                <RoboRegularText size={15} numberOfLines={2} style={{ alignSelf: 'center', marginTop:'3%', color: GlobalColors.sageGreen, alignItems: 'center', textAlign: 'center', width: '90%'}}>
                  Conéctate con tu comunidad y mantente al día
                </RoboRegularText>
              </View>
              <View style={{width:'100%', height:'48%', alignContent: 'center',justifyContent: 'center' }}>
                <MainInput />
              </View>
              <View style={{width:'100%', height:'25%', justifyContent: 'center', alignItems: 'center' }}>
                <MainButton buttonStyle={{ backgroundColor: GlobalColors.bluePrimary,width: '90%' }} textSize={18} textStyle={{color: GlobalColors.white }} text={'Iniciar sesión'}/>
              </View>


              


            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </React.Fragment>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  safeareaContainer:{
    flex: 1, 
    backgroundColor: GlobalColors.white,
  },
  keyboardContainer:{
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  contentContainer:{
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  bottomSection: {
    position: 'absolute',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    bottom: 0,
    backgroundColor: GlobalColors.white,
    width: windowWidth, 
    height: windowHeight * 0.65 
  },
})