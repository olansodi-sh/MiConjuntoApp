import { View, Text, StatusBar, KeyboardAvoidingView, Platform, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { GlobalColors } from '../../theme/global.colors'
import useSafeAreaSize from '../../hooks/useSafeAreaSize.hook'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Dimensions} from 'react-native';
import { RoboBoldText, RoboRegularText } from '../../components'
import MainButton from '../../components/buttons/main.button'
import MainInput from '../../components/inputs/main.input'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LoginScreen = () => {

  const { layoutScreen, onLayout } = useSafeAreaSize()

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [usuarioFocus, setUsuarioFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

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

              {/* ir los inputs de email y contraseña */}
              <View style={{width:'100%', height:'48%', alignItems:'center', gap: 12 }}>
                <View style={{width:'90%', height:'80%',alignItems:'center', gap: 12 }}>
                  <MainInput
                    renderLabel
                    textLabel="Usuario"
                    containerStyles={{ width: '100%',height:'15%' }}
                    placeholder="Escribe tu usuario..."
                    value={usuario}
                    onChangeText={setUsuario}
                    focus={usuarioFocus}
                    onFocus={() => { setUsuarioFocus(true); setPasswordFocus(false) }}
                    animate
                    animationInputType="shake"
                  />
                  <MainInput
                    renderLabel
                    containerStyles={{ width: '100%',height:'15%' }}
                    textLabel="Contraseña"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureText={!showPassword}
                    focus={passwordFocus}
                    onFocus={() => { setPasswordFocus(true); setUsuarioFocus(false) }}
                    animate
                    animationInputType="shake"
                    renderRightIcon
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} activeOpacity={0.6}>
                        <Text style={styles.eyeIcon}>{showPassword ? '🔓' : '🔒'}</Text>
                      </TouchableOpacity>
                    }
                  />
                </View>
              
                <View style={{width:'90%', height:'20%', flexDirection:'row' }}>
                  <View style={{width:'50%', height:'100%', flexDirection:'row'}}>
                     <BouncyCheckbox
                      isChecked={isChecked}
                      disableText
                      size={20}
                      useBuiltInState={false}
                      fillColor={GlobalColors.bluePrimary}
                      unFillColor={'transparent'}
                      iconStyle={{borderColor: 'green'}}
                      onPress={(checked: boolean) => {
                            // These two should be same value
                            console.log('::Checked::', checked);
                            console.log('::LocalChecked::', isChecked);
                            setIsChecked(!isChecked);
                      }} />
                      <RoboRegularText size={14} style={{color: GlobalColors.gray2, alignSelf:'center', marginLeft: 5}}>
                        Recordar usuario
                      </RoboRegularText>
                  </View>
                  <View style={{width:'50%', height:'100%' }}>
                     <TouchableOpacity activeOpacity={0.6} style={{alignSelf:'flex-end', justifyContent:'center', height:'100%'}}>
                        <RoboRegularText size={14} style={{color: GlobalColors.gray2}}>
                          ¿Olvidaste tu contraseña?
                        </RoboRegularText>
                     </TouchableOpacity>
                  </View>
                </View>
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
  eyeIcon: {
    fontSize: 20,
    color: GlobalColors.gray2,
  },
})