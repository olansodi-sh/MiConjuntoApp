import { View, Text } from 'react-native'
import React from 'react'

interface SafeAreaComponentProps {
  children: React.ReactNode;
}

//Posibilidad de crear componente para envolver toda la app y evitar repetir el SafeAreaView en cada pantalla, además de agregarle estilos globales
const SafeAreaComponent = ({ children }: SafeAreaComponentProps) => {
  return (
    <View>
      <Text>SafeAreaComponent</Text>
      {children}
    </View>
  )
}

export default SafeAreaComponent