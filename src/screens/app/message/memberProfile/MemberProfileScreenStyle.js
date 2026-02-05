import { StyleSheet } from 'react-native';
import Color from '../../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../../utils/Responsive';
import { Fonts } from '../../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  bodyContainer: { margin: scale(22), marginTop: verticalScale(-52) },
  profileImage: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: scale(15),
    marginBottom: scale(10),
    borderRadius: scale(40),
  },
  profileName: {
    fontSize: moderateScale(17),
    textAlign: 'center',
    fontFamily: Fonts.interBold,
    color: Color.Black,
  },
  userName: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: Fonts.interRegular,
    color: Color.Black,
  },
  heading: {
    fontSize: scale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  text: {
    fontSize: moderateScale(14),
    color: Color.rgba.Black[6],
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(20),
    paddingVertical: verticalScale(5),
    paddingBottom: verticalScale(17),
  },
  devider: {
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginTop: verticalScale(3),
    marginBottom: verticalScale(18),
  },
  videoIcon: { width: scale(24), height: scale(24) },
  introVideoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  videoImage: {
    width: scale(331),
    height: scale(331),
    borderRadius: scale(16),
    marginVertical: verticalScale(12),
    marginBottom: verticalScale(18),
  },
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
});
