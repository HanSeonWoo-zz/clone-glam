import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iPhone 11 Pro, X
const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 812;
export function normalize(size: number, based: 'width' | 'height' = 'width') {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
export enum Colors {
  Black = '#1A1A1A',
  GlamBlue = '#4B9CFF',
  Gray1 = '#E0E0E0',
  Gray2 = '#CCCCCC',
  Gray4 = '#7F7F7F',
  DarkGray1 = '#595959',
  Trans = 'transparent',
  White = '#FFFFFF',
}

export const globalStyles = StyleSheet.create({
  border: { borderColor: '#fff', borderWidth: 1, borderRadius: 16 },
  shadow: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
