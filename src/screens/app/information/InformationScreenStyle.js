import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  infoView: { width: scale(343), alignSelf: 'center' },
  infoheadingText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    textAlign: 'center',
    marginVertical: verticalScale(15),
    lineHeight: verticalScale(20),
  },
  shadowView: {
    backgroundColor: Color.White,
    paddingVertical: scale(7),
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
    width: scale(343),
    borderRadius: scale(24),
  },
  itemView: { marginBottom: verticalScale(25) },
  imageView: { flexDirection: 'row', alignItems: 'center', gap: scale(15) },
  image: { width: scale(32), height: scale(32) },
  description: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    lineHeight: verticalScale(18),
  },
  devider: {
    width: scale(343),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(5),
  },
  colorFlatlist: { marginBottom: verticalScale(5) },
  locationTypeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  locationType: { alignItems: 'center', width: '49%' },
  locationTypeText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interMedium,
    color: Color.Black,
    paddingVertical: verticalScale(10),
  },
  locationTypeDesc: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(18),
    color: Color.Gray,
    textAlign: 'center',
  },
  communityBoardImage: {
    width: scale(24),
    height: scale(24),
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  communityBoardText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    lineHeight: verticalScale(18),
    textAlign: 'center',
  },
  noteText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.sfProRegular,
    color: Color.rgba.Black[4],
    textAlign: 'center',
    paddingVertical: verticalScale(15),
  },
  toggleView: { alignItems: 'center', gap: verticalScale(10), marginVertical: verticalScale(10) },
  searchModeText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
});
