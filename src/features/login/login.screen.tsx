import { View, Text, StatusBar, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native'
import React from 'react'
import { GlobalColors } from '../../theme/global.colors'
import useSafeAreaSize from '../../hooks/useSafeAreaSize.hook'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Dimensions} from 'react-native';
import RoboBoldText from '../../components/texts/robo-bold.text'
import RoboRegularText from '../../components/texts/robo-regular.text'

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
              <RoboBoldText adjustsFontSizeToFit numberOfLines={1} style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>
                Welcome Back!
              </RoboBoldText>
              <RoboRegularText adjustsFontSizeToFit numberOfLines={2} style={{fontSize: 16, textAlign: 'center', marginTop: 10, paddingHorizontal: 20}}>
                Please login to your account to continue.
              </RoboRegularText>
              
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