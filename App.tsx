
import RootStackNavigation from './src/navigation/root-stack.navigation'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

const App = () => {
  return (
    <React.Fragment>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </React.Fragment>
  )
}

export default App