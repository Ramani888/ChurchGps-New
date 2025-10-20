import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  accountIconImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    alignSelf: 'center',
    // marginTop: scale(35),
    marginBottom: scale(10),
  },
  name: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontFamily: Fonts.interRegular,
    color: Color.Black,
  },
  btnMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
    gap: scale(40),
  },
  btnView: { alignItems: 'center' },
  plusIconImage: { width: scale(24), height: scale(24) },
  btnTextStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    marginTop: scale(5),
  },
  formView: { margin: scale(15), marginBottom: 0 },
  heading: {
    fontSize: scale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  inputFieldView: { marginBottom: verticalScale(10) },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(6),
    borderRadius: scale(16),
    height: verticalScale(46),
  },
  // dropdownView: { marginTop: verticalScale(10) },
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
  checkboxTitleStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
  },
  questionnaireView: { marginTop: verticalScale(15) },
  questionContainer: {
    marginBottom: verticalScale(20),
  },
  questionText: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(12),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(20),
  },
  optionsRow: {
    flexDirection: 'row',
    gap: scale(10),
  },
  optionButton: {
    borderRadius: scale(16),
    backgroundColor: Color.fieldColor,
    width: scale(93),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonSelected: {
    borderWidth: scale(1),
    borderColor: Color.theme1,
    backgroundColor: Color.rgba.theme1[1],
  },
  optionText: {
    fontSize: moderateScale(12),
    color: Color.Black,
  },
  optionTextSelected: {
    color: Color.Black,
    fontFamily: Fonts.interRegular,
  },
  devider: {
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  accountInfoText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(20),
    color: Color.Black,
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
});
