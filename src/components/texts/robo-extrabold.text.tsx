import { textAdapter } from '../../utils/utilies'
import { Text, TextProps } from 'react-native'
import React from 'react'

interface RoboExtraBoldTextProps extends TextProps {
  size?: number;
}

/**
 * 
 * @param size Tamaño base del texto (sin adaptar). Por defecto 16.
 * @param style Estilos adicionales para el texto.
 * @param children Contenido del texto.
 * @returns  Un componente de texto con fuente Roboto-ExtraBold y tamaño adaptativo.
 */

const RoboExtraBoldText = ({ size = 16, style, children, ...props }: RoboExtraBoldTextProps) => {
  return (
    <Text {...props} style={[{ fontFamily: 'Roboto-ExtraBold', fontSize: textAdapter(size) }, style]}>
      {children}    
    </Text>
  );
};

export default RoboExtraBoldText
