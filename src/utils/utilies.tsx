import { Dimensions, PixelRatio } from 'react-native';


//* Escala de texto adaptativa basada en el ancho de pantalla y font scale del usuario.

const guidelineBaseWidth = 375; // Base de diseño (ej: Pixel 5 =375px)
export const textAdapter = (baseSize: number) => {
  const { width } = Dimensions.get('window')
  const scale = width / guidelineBaseWidth;

  // Escala base según pantalla
  let scaled = baseSize * scale;

  // Respetamos font scale del usuario, pero con límite suave para no romper UI
  const fontScale = PixelRatio.getFontScale();
  const MAX_MULTIPLIER = 1.5;   // permite hasta +50% (ajusta según tests)
  const MIN_MULTIPLIER = 0.9;   // no bajes demasiado

  scaled *= Math.max(MIN_MULTIPLIER, Math.min(MAX_MULTIPLIER, fontScale));

  // Redondeo para nitidez
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
}