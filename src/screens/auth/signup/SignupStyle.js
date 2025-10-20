import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  contentContainer: { marginHorizontal: scale(15) },
  subTitle: {
    fontSize: moderateScale(16),
    color: Color.rgba.Black[4],
    fontFamily: Fonts.interRegular,
    textAlign: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
  },
  leftIconStyle: { width: scale(18), height: scale(18) },
  heading: {
    fontSize: scale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  emailView: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(8),
    borderRadius: scale(16),
    height: verticalScale(46),
  },
  otpView: { marginTop: verticalScale(15) },
  otpContainer: {
    justifyContent: 'space-between',
  },
  pinCodeContainer: {
    backgroundColor: Color.fieldColor,
    borderRadius: scale(16),
    width: scale(50),
    height: scale(46),
    marginHorizontal: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  pinCodeText: {
    fontSize: moderateScale(24),
    color: Color.Black,
  },
  focusStick: {
    backgroundColor: Color.Black,
    height: verticalScale(15),
  },
  passwordView: { marginVertical: verticalScale(10) },
  checkeboxText: {
    Fonts: scale(12),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  errorText: {
    fontSize: moderateScale(10),
    color: Color.Red,
    fontFamily: Fonts.interRegular,
    paddingLeft: scale(5),
  },
  checkboxTitleStyle: {
    fontSize: moderateScale(14),
    color: Color.Black,
    marginLeft: scale(10),
    fontFamily: Fonts.interRegular,
    paddingBottom: verticalScale(5),
  },
});
