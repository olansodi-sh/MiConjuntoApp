import { LayoutChangeEvent, Platform } from 'react-native'
import { useState } from 'react'

const useSafeAreaSize = () => {
	const [layoutScreen, setLayoutScreen] = useState({ height: 0, width: 0 })
	const [isFirstTime, setIsFirstTime] = useState(true)

	const onLayout = (event: LayoutChangeEvent) => {
		if (Platform.OS == 'ios') {
			const { height, width } = event.nativeEvent.layout
			setLayoutScreen({ height, width })
		} else {
			if (!isFirstTime) return
			const { height, width } = event.nativeEvent.layout
			setLayoutScreen({ height, width })
			setIsFirstTime(false)
		}
	}
	return {
		layoutScreen,
		onLayout,
	}
}

export default useSafeAreaSize
