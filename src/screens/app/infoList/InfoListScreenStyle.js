import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { scale, verticalScale } from '../../../utils/Responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Gray1,
    paddingHorizontal: scale(15),
  },
  iconContainer: {
    marginTop: verticalScale(30),
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
  topButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  savedIcon: { width: scale(20), height: verticalScale(20) },
});
