import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalColors } from '../../theme/global.colors';
import useSafeAreaSize from '../../hooks/useSafeAreaSize.hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoboBoldText, RoboRegularText } from '../../components';
import MainButton from '../../components/buttons/main.button';
import MainInput from '../../components/inputs/main.input';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useAuthStore } from './store/auth.store';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const { layoutScreen, onLayout } = useSafeAreaSize();

  const { loginEmployee, loginResident, isLoading, rememberedUser } = useAuthStore();
  const [usuario, setUsuario] = useState(rememberedUser?.user || 'oliveradmin');
  const [password, setPassword] = useState('123456789');
  const [usuarioFocus, setUsuarioFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(!!rememberedUser);
  const [userType, setUserType] = useState<'employee' | 'resident'>(rememberedUser?.type || 'employee');

  useEffect(() => {
    if (rememberedUser) {
      setUsuario(rememberedUser.user);
      setUserType(rememberedUser.type);
      setIsChecked(true);
    }
  }, [rememberedUser]);

  const handleToggleUserType = (type: 'employee' | 'resident') => {
    setUserType(type);
    if (type === 'employee') {
      setUsuario('oliveradmin');
    } else {
      setUsuario('david@test.com');
    }
  };

  const handleLogin = async () => {
    if (!usuario || !password) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      if (userType === 'employee') {
        await loginEmployee({
          username: usuario,
          password: password,
        }, isChecked);
      } else {
        await loginResident({
          identifier: usuario,
          password: password,
        }, isChecked);
      }
    } catch (error: any) {
      const message = error.message || 'Error al iniciar sesión';
      Alert.alert('Error de autenticación', message);
    }
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <SafeAreaView style={{ ...styles.safeareaContainer }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ ...styles.keyboardContainer }}
          onLayout={onLayout}
        >
          <View style={{ ...styles.contentContainer }}>
            {/* top */}
            <View
              style={{
                width: width,
                height: height * 0.4,
                flexShrink: 1,
                backgroundColor: GlobalColors.cream,
              }}
            >
              <Image
                blurRadius={0.9}
                resizeMode="cover"
                source={require('../../../public/images/loginBackground.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            {/* bottom */}
            <View style={{ ...styles.bottomSection }}>
              <View
                style={{
                  width: '90%',
                  height: '27%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <RoboBoldText
                  size={25}
                  style={{ alignSelf: 'center', color: GlobalColors.navyDeep }}
                >
                  ¡Bienvenido de nuevo!
                </RoboBoldText>
                <RoboRegularText
                  size={15}
                  numberOfLines={2}
                  style={{
                    alignSelf: 'center',
                    marginTop: '3%',
                    color: GlobalColors.charcoalSoft,
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '90%',
                  }}
                >
                  Conéctate con tu comunidad y mantente al día
                </RoboRegularText>

                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, userType === 'employee' && styles.toggleButtonActive]}
                    onPress={() => handleToggleUserType('employee')}
                  >
                    <Text style={[styles.toggleText, userType === 'employee' && styles.toggleTextActive]}>Empleado</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, userType === 'resident' && styles.toggleButtonActive]}
                    onPress={() => handleToggleUserType('resident')}
                  >
                    <Text style={[styles.toggleText, userType === 'resident' && styles.toggleTextActive]}>Residente</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* ir los inputs de email y contraseña */}
              <View
                style={{
                  width: '100%',
                  height: '48%',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: '90%',
                    height: '80%',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <MainInput
                    renderLabel
                    textLabel={userType === 'employee' ? 'Usuario' : 'Correo Electrónico'}
                    containerStyles={{ width: '90%', height: '15%' }}
                    placeholder={userType === 'employee' ? 'Escribe tu usuario...' : 'Escribe tu correo...'}
                    value={usuario}
                    onChangeText={setUsuario}
                    focus={usuarioFocus}
                    onFocus={() => {
                      setUsuarioFocus(true);
                      setPasswordFocus(false);
                    }}
                    animate
                    animationInputType="shake"
                  />
                  <MainInput
                    renderLabel
                    containerStyles={{ width: '90%', height: '15%' }}
                    textLabel="Contraseña"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureText={!showPassword}
                    focus={passwordFocus}
                    onFocus={() => {
                      setPasswordFocus(true);
                      setUsuarioFocus(false);
                    }}
                    animate
                    animationInputType="shake"
                    renderRightIcon
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setShowPassword(prev => !prev)}
                        activeOpacity={0.6}
                      >
                        <Text style={styles.eyeIcon}>
                          {showPassword ? '🔓' : '🔒'}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                </View>

                <View
                  style={{ width: '80%', height: '20%', flexDirection: 'row' }}
                >
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      flexDirection: 'row',
                    }}
                  >
                    <BouncyCheckbox
                      isChecked={isChecked}
                      disableText
                      size={20}
                      useBuiltInState={false}
                      fillColor={GlobalColors.navyDeep}
                      unFillColor={'transparent'}
                      iconStyle={{ borderColor: GlobalColors.navyDeep }}
                      onPress={(checked: boolean) => {
                        // These two should be same value
                        console.log('::Checked::', checked);
                        console.log('::LocalChecked::', isChecked);
                        setIsChecked(!isChecked);
                      }}
                    />
                    <RoboRegularText
                      adjustsFontSizeToFit
                      size={13}
                      style={{
                        color: GlobalColors.charcoalSoft,
                        alignSelf: 'center',
                        marginLeft: 5,
                      }}
                    >
                      Recordar usuario
                    </RoboRegularText>
                  </View>
                  <View style={{ width: '50%', height: '100%' }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={{
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        height: '100%',
                      }}
                    >
                      <RoboRegularText
                        adjustsFontSizeToFit
                        size={13}
                        style={{ color: GlobalColors.charcoalSoft }}
                      >
                        ¿Olvidaste tu contraseña?
                      </RoboRegularText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MainButton
                  buttonStyle={{
                    backgroundColor: GlobalColors.navyDeep,
                    width: '90%',
                  }}
                  textSize={18}
                  textStyle={{ color: GlobalColors.white }}
                  text={'Iniciar sesión'}
                  onPress={handleLogin}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  bottomSection: {
    position: 'absolute',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    bottom: 0,
    backgroundColor: GlobalColors.cream,
    width: width,
    height: height * 0.65,
  },
  eyeIcon: {
    fontSize: 20,
    color: GlobalColors.gray2,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 4,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 21,
  },
  toggleButtonActive: {
    backgroundColor: GlobalColors.navyDeep,
  },
  toggleText: {
    fontSize: 14,
    color: GlobalColors.charcoalSoft,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: 'white',
  },
});
