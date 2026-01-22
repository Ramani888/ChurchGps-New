import { StyleSheet } from 'react-native';
import Color from '../../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../../utils/Responsive';
import { Fonts } from '../../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  profileImageView: { marginTop: verticalScale(-30) },
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
});
