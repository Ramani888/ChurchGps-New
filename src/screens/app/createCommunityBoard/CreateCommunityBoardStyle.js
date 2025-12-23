import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  bodyContaier: { flex: 1, marginTop: verticalScale(65), marginHorizontal: scale(15) },
  headingStyle: {
    fontSize: moderateScale(16),
    color: Color.Black,
    fontFamily: Fonts.interSemiBold,
  },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(7),
    borderRadius: scale(16),
    height: verticalScale(46),
    width: '100%',
  },
  plusIcon: {
    backgroundColor: Color.White,
    borderRadius: scale(5),
    marginLeft: scale(10),
    marginTop: verticalScale(3),
  },
  optionalText: {
    fontSize: moderateScale(16),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
  text: {
    fontSize: moderateScale(12),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    marginVertical: verticalScale(5),
  },
  dropdownView: { marginBottom: verticalScale(15) },
  dropdownStyle: {
    backgroundColor: Color.fieldColor,
    height: verticalScale(44),
    paddingHorizontal: scale(15),
    marginTop: verticalScale(10),
    borderRadius: scale(16),
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
});
