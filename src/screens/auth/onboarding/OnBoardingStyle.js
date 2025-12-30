import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    paddingHorizontal: scale(20),
  },
  gpsImage: {
    height: '87%',
    alignSelf: 'center',
  },
  fadeContainer: {
    marginTop: verticalScale(-25),
  },
  titleView: {
    backgroundColor: Color.White,
    marginTop: verticalScale(-130),
    height: verticalScale(110),
    opacity: 1,
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.spaceGroteskBold,
    alignSelf: 'center',
    paddingTop: verticalScale(10),
  },
  subTitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    alignSelf: 'center',
    paddingTop: verticalScale(7),
    color: Color.rgba.Black[4],
    textAlign: 'center',
  },
});
