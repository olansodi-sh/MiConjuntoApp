import { textAdapter } from '../../utils/utilies'
import { Text, TextProps } from 'react-native'
import React from 'react'

interface RoboMediumTextProps extends TextProps {
  size?: number;
}

/**
 * 
 * @param size Tamaño base del texto (sin adaptar). Por defecto 16.
 * @param style Estilos adicionales para el texto.
 * @param children Contenido del texto.
 * @returns  Un componente de texto con fuente Roboto-Medium y tamaño adaptativo.
 */

const RoboMediumText = ({ size = 16, style, children, ...props }: RoboMediumTextProps) => {
  return (
    <Text {...props} style={[{ fontFamily: 'Roboto-Medium', fontSize: textAdapter(size) }, style]}>
      {children}    
    </Text>
  );
};

export default RoboMediumText
