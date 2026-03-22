import { TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import RoboBoldText from '../texts/robo-bold.text'

interface MainButtonProps {
    onPress?: () => void;
    isLoading?: boolean;
    text?: string;
    textSize?: number;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    customHeight?: number;
}

/**
 * @param onPress Función a ejecutar al presionar el botón.
 * @param isLoading Indica si el botón está en estado de carga. Por defecto es false.
 * @param text Texto a mostrar en el botón. Por defecto es "Aceptar".
 * @param textSize Tamaño del texto del botón. Por defecto es 16.
 * @param textStyle Estilos adicionales para el texto del botón.
 * @param buttonStyle Estilos adicionales para el contenedor del botón.
 * @param customHeight Altura personalizada para el botón. Por defecto es el 7% de la altura de la pantalla.
 * @returns Un componente de botón principal con texto y estado de carga.
 */

const screenSize = Dimensions.get('window')

const MainButton = ({ onPress, isLoading = false, text = 'Aceptar', textSize = 16, textStyle = {}, buttonStyle = {}, customHeight = screenSize.height * 0.07}: MainButtonProps ) => {
  
    return (
    <TouchableOpacity style={[styles.buttonContainer,{ height: customHeight }, buttonStyle]} onPress={onPress} activeOpacity={0.8}>
        {
            isLoading ? (
                <ActivityIndicator size="small" color="#bda0a0d2" />
            ):(
                <RoboBoldText adjustsFontSizeToFit numberOfLines={1} size={textSize}  style={textStyle}>
                    {text}
                </RoboBoldText>
            )
        }
    </TouchableOpacity>
  )
}

export default MainButton


const styles = StyleSheet.create({
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
        alignSelf: 'center',
		borderRadius: 50,
		justifyContent: 'center',
	},
})