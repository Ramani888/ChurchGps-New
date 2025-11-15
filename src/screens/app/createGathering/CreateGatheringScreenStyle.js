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
  gatheringOptionStyle: {
    width: scale(319),
    height: verticalScale(132),
    paddingVertical: verticalScale(12),
    borderWidth: scale(1),
    borderColor: Color.rgba.Gray[2],
    borderRadius: scale(16),
    marginTop: verticalScale(10),
  },
  checkboxView: {
    width: '33%',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  checkboxTitleStyle: {
    fontSize: moderateScale(12),
    color: Color.Black,
    marginLeft: scale(10),
    fontFamily: Fonts.interRegular,
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(3),
    textAlign: 'center',
  },
});
