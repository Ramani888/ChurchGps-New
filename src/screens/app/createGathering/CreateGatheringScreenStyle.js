import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  tabIcon: { width: scale(16), height: verticalScale(16) },
  tabComponent: { margin: scale(20) },
  childContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  shadowView: {
    height: verticalScale(655),
    backgroundColor: Color.White,
    padding: scale(12),
    width: scale(343),
    borderRadius: scale(24),
  },
  headingStyle: {
    fontSize: moderateScale(16),
    color: Color.Black,
    fontFamily: Fonts.interSemiBold,
  },
  optionViewStyle: {
    width: scale(319),
    height: verticalScale(132),
    paddingVertical: verticalScale(12),
    borderWidth: scale(1),
    borderColor: Color.rgba.Gray[2],
    borderRadius: scale(16),
    marginTop: verticalScale(10),
  },
  checkboxView: {
    // width: '33.33%',
    alignItems: 'center',
    marginVertical: verticalScale(7),
  },
  checkboxTitleStyle: {
    fontSize: moderateScale(12),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(3),
    textAlign: 'center',
  },
  informText: {
    fontSize: moderateScale(11.89),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    lineHeight: verticalScale(18),
    paddingVertical: verticalScale(10),
  },
  inputFieldView: { marginBottom: verticalScale(10) },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(7),
    borderRadius: scale(16),
    height: verticalScale(46),
    // marginBottom: verticalScale(7),
  },
  groupPictureContainerStyle: { flexDirection: 'row', width: '100%' },
  groupPictureViewStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  groupPictureStyle: { width: scale(44), height: scale(44) },
  myPictureText: {
    fontSize: moderateScale(12),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    paddingTop: verticalScale(5),
  },
  dropdownView: { marginBottom: verticalScale(8) },
  dropdownStyle: {
    backgroundColor: Color.fieldColor,
    height: verticalScale(46),
    paddingHorizontal: scale(15),
    marginTop: verticalScale(10),
    borderRadius: scale(16),
  },
  dropdownMenuContianerStyle: {
    borderRadius: scale(10),
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(5),
    borderBottomWidth: scale(0.5),
    borderColor: Color.rgba.Gray[2],
    gap: scale(10),
  },
  checkboxTitleStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
  },
  precizeText: { marginTop: verticalScale(5) },
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interMedium,
    color: Color.Black,
  },
  value: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
  },
  locationImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  locationView: { alignItems: 'center' },
  locationImage: {
    width: scale(105.36),
    height: scale(100),
    borderRadius: scale(72),
  },
  distanceText: {
    fontSize: moderateScale(14),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    textAlign: 'center',
  },
  mileCheckboxStyle: {
    marginRight: scale(18),
    alignItems: 'center',
    marginTop: verticalScale(15),
    marginHorizontal: scale(5),
  },
});
