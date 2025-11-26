import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White, alignItems: 'center' },
  tabIcon: { width: scale(16), height: verticalScale(16) },
  tabComponent: { margin: scale(20) },
  scrollView: { flex: 1, backgroundColor: Color.White, padding: scale(10) },
  shadowView: {
    backgroundColor: Color.White,
    padding: scale(10.5),
    marginBottom: verticalScale(20),
    width: scale(343),
    borderRadius: scale(24),
  },
  locationView: { marginBottom: verticalScale(8) },
  heading: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  optionViewStyle: {
    width: scale(319),
    height: verticalScale(132),
    paddingVertical: verticalScale(6),
    borderWidth: scale(1),
    borderColor: Color.rgba.Gray[2],
    borderRadius: scale(16),
    marginTop: verticalScale(10),
  },
  checkboxView: {
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
  dropdownView: { width: '100%' },
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
    padding: scale(5),
    borderBottomWidth: scale(0.5),
    borderColor: Color.rgba.Gray[2],
  },
});
