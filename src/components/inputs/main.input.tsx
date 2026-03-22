import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'


const { width, height } = useWindowDimensions()

import { shake, shakeRotate, valueShake, valueShakeRotate } from '../../utils/animations'
import { textAdapter } from '../../utils/utilies'
import { GlobalColors } from '../../theme/global.colors'

/**
 * * Componente InputLabel
 *
 * * Recibe las siguientes propiedades:
 * @property {string} placeholder Texto que se muestra cuando el input no tiene texto
 * @property {boolean} renderLabel Booleano que indica si se debe mostrar el label
 * @property {string} textLabel Texto que se muestra como label del input
 * @property {object} textLabelStyles Estilos que se aplican al texto del label
 * @property {boolean} renderError Booleano que indica si se debe mostrar el error
 * @property {string} textError Texto que se muestra como error
 * @property {string} value Valor del input
 * @property {function} onChangeText Función que se ejecuta cuando se cambia el texto del input
 * @property {boolean} renderLeftIcon Booleano que indica si se debe mostrar el icono izquierdo
 * @property {component} leftIcon Icono que se muestra a la izquierda del input
 * @property {boolean} renderRightIcon Booleano que indica si se debe mostrar el icono derecho
 * @property {component} rightIcon Icono que se muestra a la derecha del input
 * @property {object} containerInputStyles Estilos que se aplican al contenedor del input
 * @property {object} containerStyles Estilos que se aplican al contenedor del input
 * @property {object} containerStylesForContainer Estilos que se aplican al contenedor del contenedor del input
 * @property {boolean} disabled Booleano que indica si el input está deshabilitado
 * @property {boolean} focus Booleano que indica si el input está seleccionado
 * @property {function} onFocus Función que se ejecuta cuando el input es seleccionado
 * @property {boolean} secureText Booleano que indica si el texto del input debe estar protegido
 * @property {string} keyboardType Tipo de teclado que se muestra al seleccionar el input
 * @property {boolean} animate Booleano que indica si el componente debe animarse
 * @property {string} animationLabelType Tipo de animación que se ejecuta para el label
 * @property {string} animationInputType Tipo de animación que se ejecuta para el input
 * @property {string} animationErrorType Tipo de animación que se ejecuta para el error
 * @property {boolean} required Booleano que indica si el campo es requerido

 *
 * * Se debe enviar un componente a renderizar como leftIcon o rightIcon
 * * Para que el componente se pueda animar se debe establecer la propiedad onfocus y focus
 * * Para animar un elemento del componente se debe establecer 'animate' en true y definir la animacion del elemento
 * * Animaciones disponibles: shake, shakeRotate
 * */
const CustomInput = ({
	labelBold = false,
	placeholder = '',
	renderLabel = false,
	textLabel = '',
    textLabelStyles = {},
	renderError = false,
	textError = '',
	value = '',
	onChangeText = () => {},
	renderLeftIcon = false,
	leftIcon = null,
	renderRightIcon = false,
	rightIcon = null,
	containerStyles = {},
	containerStylesForContainer = {},
    containerInputStyles = {},
	disabled = false,
	focus = false,
	onFocus = () => {},
	secureText = false,
	keyboardType = 'default',
	required = false,

	animate = false,
	animationLabelType = '',
	animationInputType = '',
	animationErrorType = '',
}) => {
	const [labelPosition, setLabelPosition] = useState(new Animated.Value(0))
	const [inputPosition, setInputPosition] = useState(new Animated.Value(0))
	const [errorPosition, setErrorPosition] = useState(new Animated.Value(0))

	//En el caso de querer usar otra animación en el componente, se debe agregar un nuevo case en los switch
	useEffect(() => {
		if (focus && animate) {
			switch (animationLabelType) {
				case 'shake':
					shake(labelPosition).start()
					break
				case 'shakeRotate':
					shakeRotate(labelPosition).start()
					break
			}

			switch (animationInputType) {
				case 'shake':
					shake(inputPosition).start()
					break
				case 'shakeRotate':
					shakeRotate(inputPosition).start()
					break
			}
		}
	}, [focus])

	useEffect(() => {
		if (renderError && animate) {
			switch (animationErrorType) {
				case 'shake':
					shake(errorPosition).start()
					break
				case 'shakeRotate':
					shakeRotate(errorPosition).start()
					break
			}
		}
	}, [renderError])

	const getValueAnimationLabel = () => {
		switch (animationLabelType) {
			case 'shake':
				return valueShake(labelPosition, 'left')
			case 'shakeRotate':
				return valueShakeRotate(labelPosition)
			case '':
				return {}
		}
	}

	const getValueAnimationInput = () => {
		switch (animationInputType) {
			case 'shake':
				return valueShake(inputPosition, 'left')
			case 'shakeRotate':
				return valueShakeRotate(inputPosition)
			case '':
				return {}
		}
	}

	const getValueAnimationError = () => {
		switch (animationErrorType) {
			case 'shake':
				return valueShake(errorPosition, 'left')
			case 'shakeRotate':
				return valueShakeRotate(errorPosition)
			case '':
				return {}
		}
	}

	return (
		<View style={[styles.resetStyles, styles.container, containerStyles]}>
			<Animated.Text
				numberOfLines={1}
				style={[
					styles.resetStyles,
					styles.label,
					labelBold && { fontFamily: 'Nunito-Bold' },
					renderLabel ? { display: 'flex' } : { display: 'none' },
					animate && getValueAnimationLabel(),
                    textLabelStyles
				]}
			>
				{textLabel}
				{required && <Text style={{ color: 'red' }}> *</Text>}
			</Animated.Text>
			<View
				style={[
					styles.resetStyles,
					styles.inputContainer,
					containerStylesForContainer,
					focus ? styles.focusStyle : styles.noFocusStyle,
					disabled && styles.disabled,
                    containerInputStyles
				]}
			>
				<View
					style={[
						styles.resetStyles,
						styles.leftIconContainer,
						renderLeftIcon ? { display: 'flex' } : { display: 'none' },
					]}
				>
					{leftIcon}
				</View>
				<Animated.View
					style={[
						styles.resetStyles,
						styles.style,
						!renderLeftIcon && { paddingLeft: width * 0.01 },
						animate && getValueAnimationInput(),
					]}
				>
					<TextInput
						textContentType="oneTimeCode"
						returnKeyType="done"
						autoCapitalize="none"
						style={[styles.resetStyles, styles.input]}
						placeholder={placeholder}
						placeholderTextColor={GlobalColors.gray2}
						onFocus={onFocus}
						secureTextEntry={secureText}
						onChangeText={onChangeText}
						value={value}
						cursorColor={GlobalColors.gray1}
						selectionColor={GlobalColors.bluePrimary}
						keyboardType={keyboardType}
						editable={!disabled}
						selectTextOnFocus={!disabled}
						pointerEvents={disabled ? 'none' : 'auto'}
					></TextInput>
				</Animated.View>
				<View
					style={[
						styles.resetStyles,
						styles.rightIconContainer,
						renderRightIcon ? { display: 'flex' } : { display: 'none' },
					]}
				>
					{rightIcon}
				</View>
			</View>
			<Animated.Text
				style={[
					styles.resetStyles,
					styles.error,
					renderError ? { display: 'flex' } : { display: 'none' },
					animate && getValueAnimationError(),
				]}
				numberOfLines={2}
			>
				{textError}
			</Animated.Text>
		</View>
	)
}

const styles = StyleSheet.create({
	resetStyles: {
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,

		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,

		borderWidth: 0,
	},
	container: {
		minHeight: height * 0.1,
		width: '100%',
		backgroundColor: 'transparent',
	},
	inputContainer: {
		flexDirection: 'row',
		minHeight: height * 0.075,
		paddingLeft: width * 0.01,
		paddingRight: width * 0.02,
		paddingTop: height * 0.01,
		paddingBottom: height * 0.01,
		borderWidth: 1.2,
		borderBottomWidth: 1.2,
		borderRadius: 8,
		backgroundColor: GlobalColors.white1,
	},
	leftIconContainer: {
		width: '12%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GlobalColors.white1,
	},
	rightIconContainer: {
		width: '12%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GlobalColors.white1,
	},
	disabled: {
		borderColor: GlobalColors.gray5,
		borderBottomColor: GlobalColors.gray5,
	},
	focusStyle: {
		borderColor: GlobalColors.mintLight,
		borderBottomColor: GlobalColors.mintLight,
	},
	noFocusStyle: {
		borderColor: GlobalColors.gray1,
		borderBottomColor: GlobalColors.gray1,
	},
	style: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: GlobalColors.white1,
		paddingLeft: width * 0.01,
	},
	input: {
		fontSize: textAdapter(16),
		fontFamily: 'Roboto-Regular',
		color: GlobalColors.gray1,
	},
	error: {
		maxWidth: '95%',
		marginTop: height * 0.005,
		marginLeft: width * 0.02,
		alignSelf: 'baseline',

		fontSize: textAdapter(14),
		fontFamily: 'Roboto-SemiBold',
		color: GlobalColors.error,
	},
	label: {
		maxWidth: '96%',
		marginBottom: height * 0.01,
		alignSelf: 'baseline',
		fontSize: textAdapter(16),
		fontFamily: 'Roboto-Regular',
		color: GlobalColors.black1,
		fontWeight: '500',
	},
})

export default CustomInput
