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

const screenSize = Dimensions.get('window')

const MainButton = (
    { 
        onPress,
        isLoading = false, 

        text = 'Aceptar',
        textSize = 16,
        textStyle = {},

        buttonStyle = {},
        customHeight = screenSize.height * 0.07,
    
    }: MainButtonProps
) => {
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