import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';
const isBigScreen = Dimensions.width > 1024
const dynamicFontSize = (size) => {
  if (Platform.OS === 'ios') {
    return PixelRatio.getFontScale() * size;
  } else if (Platform.OS === 'android') {
    const { width, height } = Dimensions.get('window');
    const maxDimension = Math.min(width, height);
    return (maxDimension / 400) * size; // 375 è una dimensione di riferimento.
  } else {
    return size * 0.8; // * 0.8
  }
};

const fontStyles = StyleSheet.create({
  largeTitle: {
    fontSize: dynamicFontSize(32),
    // Altri stili personalizzati per il grande titolo
  },
  title1: {
    fontSize: dynamicFontSize(28),
    // Altri stili personalizzati per il titolo 1
  },
  title2: {
    fontSize: dynamicFontSize(22),
    // Altri stili personalizzati per il titolo 2
  },
  title3: {
    fontSize: dynamicFontSize(20),
    // Altri stili personalizzati per il titolo 3
  },
  headline: {
    fontSize: dynamicFontSize(17),
    fontWeight: 'bold',
    // Altri stili personalizzati per l'headline
  },
  subheadline: {
    fontSize: dynamicFontSize(15),
    // Altri stili personalizzati per il subheadline
  },
  body: {
    fontSize: dynamicFontSize(17),
    // Altri stili personalizzati per il corpo del testo
  },
  callout: {
    fontSize: dynamicFontSize(16),
    // Altri stili personalizzati per il callout
  },
  caption1: {
    fontSize: dynamicFontSize(12),
    // Altri stili personalizzati per la didascalia 1
  },
  caption2: {
    fontSize: dynamicFontSize(11),
    // Altri stili personalizzati per la didascalia 2
  },
  footnote: {
    fontSize: dynamicFontSize(10),
    // Altri stili personalizzati per la nota a piè di pagina
  },
});

export { fontStyles, dynamicFontSize };