import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  passwordIconStyle: {
    width: scale(119),
    height: verticalScale(120),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  formView: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  emailView: {
    marginTop: verticalScale(30),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
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
  passwordView: { marginVertical: verticalScale(15) },
  errorText: {
    fontSize: moderateScale(10),
    color: Color.Red,
    fontFamily: Fonts.interRegular,
    paddingLeft: scale(5),
  },
});
