import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White, alignItems: 'center' },
  profileImage: { width: scale(100), height: scale(100) },
  videoView: {
    width: scale(300),
    height: verticalScale(340),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderStyle: 'dashed',
    borderRadius: scale(24),
    marginVertical: verticalScale(40),
  },
  buttonView: {
    backgroundColor: Color.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(300),
    height: verticalScale(100),
    padding: scale(15),
    borderRadius: scale(24),
  },
  columnView: { alignItems: 'center' },
  iconView: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme1,
  },
  btnText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    paddingTop: verticalScale(10),
  },
  infoText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.sfProRegular,
    color: Color.Black,
    lineHeight: verticalScale(18),
    textAlign: 'center',
    width: scale(300),
    paddingTop: verticalScale(35),
  },
});
