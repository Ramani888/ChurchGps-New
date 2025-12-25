import { StyleSheet } from 'react-native';
import Color from '../../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../../utils/Responsive';
import { Fonts } from '../../../../utils/Font';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  header: {
    height: verticalScale(60),
    padding: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(14),
  },
  userImage: { width: scale(36), height: scale(36) },
  headerTitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    width: scale(157),
  },
  memberLength: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.rgba.Black[4],
    width: scale(157),
  },
  headerIconView: { flexDirection: 'row', alignItems: 'center', gap: scale(12) },
  icon: { width: scale(24), height: scale(24) },
  menuPopup: {
    width: scale(160),
    padding: scale(16),
    marginTop: verticalScale(35),
    marginLeft: -verticalScale(8),
    borderRadius: scale(20),
  },
  menuView: { flexDirection: 'row', alignItems: 'center', gap: scale(8) },
  menuImage: { width: scale(20), height: scale(20) },
  menuText: { fontSize: moderateScale(16), fontFamily: Fonts.interRegular },
  switchView: { marginTop: verticalScale(10), alignSelf: 'center' },
  devider: {
    width: scale(128),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(2),
  },
  messageInput: {
    position: 'absolute',
    bottom: verticalScale(10),
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
  },
  inputStyle: {
    width: scale(258),
    height: scale(50),
    marginTop: verticalScale(8.5),
    marginRight: scale(10),
    fontSize: moderateScale(14),
  },
  searchInput: {
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
    marginTop: verticalScale(15),
  },
});
