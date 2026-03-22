import { textAdapter } from '../../utils/utilies'
import { Text, TextProps } from 'react-native'
import React from 'react'

interface RoboBoldTextProps extends TextProps {
  size?: number;
}

/**
 * 
 * @param size Tamaño base del texto (sin adaptar). Por defecto 16.
 * @param style Estilos adicionales para el texto.
 * @param children Contenido del texto.
 * @returns  Un componente de texto con fuente Roboto-Bold y tamaño adaptativo.
 */

const RoboBoldText = ({ size = 16, style, children, ...props }: RoboBoldTextProps) => {
  return (
    <Text {...props} style={[{ fontFamily: 'Roboto-Bold', fontSize: textAdapter(size) }, style]}>
      {children}    
    </Text>
  );
};

export default RoboBoldText