import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  gpsImage: {
    width: scale(500),
    height: verticalScale(550),
    alignSelf: 'center',
    marginTop: verticalScale(-35),
  },
  form: { marginHorizontal: scale(15), marginTop: verticalScale(-210) },
  heading: {
    fontSize: scale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  inputContainer: { marginTop: verticalScale(25) },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(8),
    borderRadius: scale(16),
    height: verticalScale(46),
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.linkColor,
    textAlign: 'right',
    marginTop: verticalScale(10),
  },
  devider: {
    borderBottomWidth: scale(0.8),
    borderBottomColor: Color.rgba.Gray[2],
    marginTop: verticalScale(10),
  },
  or: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    textAlign: 'center',
    backgroundColor: Color.White,
    width: scale(50),
    marginTop: verticalScale(-15),
    alignSelf: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
    marginTop: verticalScale(15),
  },
  leftIconStyle: { width: scale(18), height: scale(18) },
});
