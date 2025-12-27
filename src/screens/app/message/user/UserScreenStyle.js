import { StyleSheet } from 'react-native';
import Color from '../../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../../utils/Responsive';
import { Fonts } from '../../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  bodyContainer: { margin: scale(20) },
  tabView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tabButton: {
    width: scale(105),
    height: verticalScale(48),
    borderRadius: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(2),
    borderColor: Color.rgba.Gray[1],
  },
  tabImages: { width: scale(24), height: scale(24) },
  flatlist: { marginTop: verticalScale(10) },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(25),
    gap: scale(10),
  },
  itemWrapper: {
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  userImage: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(46),
    marginLeft: scale(-2),
  },
  title: { fontSize: moderateScale(16), fontFamily: Fonts.interSemiBold, color: Color.Black },
  message: { fontSize: moderateScale(14), fontFamily: Fonts.interRegular, color: Color.Black },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
