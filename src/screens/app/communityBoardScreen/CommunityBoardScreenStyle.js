import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  tabIcon: { width: scale(16), height: verticalScale(16) },
  tabComponent: { margin: scale(20) },
  fabButton: {
    position: 'absolute',
    bottom: verticalScale(0),
    alignSelf: 'flex-end',
    margin: scale(20),
  },
  fabIcon: { width: scale(40), height: verticalScale(40) },
  flatlistView: { marginVertical: verticalScale(20), paddingBottom: verticalScale(155) },
  listContainer: {
    width: scale(343),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  profileImage: { width: scale(32), height: scale(32), marginRight: scale(10) },
  firstlineView: { flexDirection: 'row', alignItems: 'center', gap: scale(10) },
  image: { width: scale(16), height: scale(16) },
  titleStyle: { fontSize: moderateScale(14), fontFamily: Fonts.interSemiBold, width: scale(173) },
  textStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(18),
    color: Color.rgba.Black[6],
  },
  desc: { width: scale(299), marginTop: verticalScale(7) },
  distanceView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: scale(5),
  },
  devider: {
    width: scale(343),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(15),
    alignSelf: 'center',
  },
});
