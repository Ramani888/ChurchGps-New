import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import Color from '../../../utils/Color';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  iconContainer: {
    position: 'absolute',
    top: verticalScale(55),
    marginHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(24),
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  icon: { width: scale(24), height: scale(24) },
  bottomsheetIndicatorStyle: {
    backgroundColor: Color.grayScale3,
    width: moderateScale(60),
  },
});
