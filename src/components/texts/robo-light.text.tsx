import { textAdapter } from '../../utils/utilies'
import { Text, TextProps } from 'react-native'
import React from 'react'

interface RoboLightTextProps extends TextProps {
  size?: number;
}

/**
 * 
 * @param size Tamaño base del texto (sin adaptar). Por defecto 16.
 * @param style Estilos adicionales para el texto.
 * @param children Contenido del texto.
 * @returns  Un componente de texto con fuente Roboto-Light y tamaño adaptativo.
 */

const RoboLightText = ({ size = 16, style, children, ...props }: RoboLightTextProps) => {
  return (
    <Text {...props} style={[{ fontFamily: 'Roboto-Light', fontSize: textAdapter(size) }, style]}>
      {children}    
    </Text>
  );
};

export default RoboLightText
