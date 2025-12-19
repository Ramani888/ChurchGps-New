import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  bodyContainer: { margin: scale(20) },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(331),
    height: verticalScale(44),
    backgroundColor: Color.rgba.Gray[1],
    paddingHorizontal: scale(14),
    borderRadius: scale(10),
    alignSelf: 'center',
    gap: scale(5),
  },
  inputStyle: {
    height: verticalScale(44),
    color: Color.Black,
    textAlignVertical: 'center',
  },
  searchIcon: { width: scale(20), height: scale(20) },
  flatlist: { marginTop: verticalScale(10) },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginTop: verticalScale(20),
  },
  friendsImage: { width: scale(40), height: scale(40) },
  title: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    width: scale(213),
  },
});
