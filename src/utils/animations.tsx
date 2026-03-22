import { Animated, Easing, ViewStyle } from 'react-native'
import { useWindowDimensions } from 'react-native'

const { width } = useWindowDimensions()

// TYPES
type Direction = 'left' | 'right' | 'top' | 'bottom'

// FUNCTIONS

/**
 * Función que anima el componente con el efecto de sacudir
 */
export const shake = (
	value: Animated.Value,
	numberShaking: number = 3
): Animated.CompositeAnimation => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(value, {
				toValue: 1,
				duration: 150,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
			Animated.timing(value, {
				toValue: 0,
				duration: 150,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
		]),
		{
			iterations: numberShaking,
		}
	)
}

/**
 * Función que anima el componente con el efecto de sacudir y rotar
 */
export const shakeRotate = (
	value: Animated.Value,
	numberShaking: number = 2
): Animated.CompositeAnimation => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(value, {
				toValue: 0,
				duration: 80,
				useNativeDriver: false,
			}),
			Animated.timing(value, {
				toValue: 0.5,
				duration: 80,
				useNativeDriver: false,
			}),
			Animated.timing(value, {
				toValue: 1,
				duration: 80,
				useNativeDriver: false,
			}),
			Animated.timing(value, {
				toValue: 0.5,
				duration: 80,
				useNativeDriver: false,
			}),
		]),
		{
			iterations: numberShaking,
		}
	)
}

// VALUES

/**
 * Retorna el valor de la animación 'shake'
 */
export const valueShake = (
	value: Animated.Value,
	direction: Direction = 'left'
): Animated.WithAnimatedObject<ViewStyle> => {
	return {
		[direction]: value.interpolate({
			inputRange: [0, 1],
			outputRange: [0, width * 0.012],
		}),
	}
}

/**
 * Retorna el valor de la animación 'shakeRotate'
 */
export const valueShakeRotate = (
	value: Animated.Value
): Animated.WithAnimatedObject<ViewStyle> => {
	return {
		transform: [
			{
				rotate: value.interpolate({
					inputRange: [0, 1],
					outputRange: ['-3deg', '3deg'],
				}),
			},
		],
	}
}