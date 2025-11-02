import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import Color from '../../../utils/Color';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  pin: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    borderWidth: 4,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: scale(0.3),
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    elevation: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinImage: { width: scale(45), height: scale(45), borderRadius: scale(5) },
  pinDots: {
    position: 'absolute',
    top: verticalScale(-6),
    left: scale(20),
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#ff9800',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  popup: {
    width: scale(240),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    overflow: 'hidden',
    padding: scale(10),
  },
  popupTitle: { fontWeight: '700', fontSize: 16, marginBottom: 2 },
  popupSub: { color: '#6b7280', marginBottom: 8 },
  popupImage: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: scale(8),
  },
  iconContainer: {
    marginTop: verticalScale(60),
    marginHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(24),
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  icon: { width: scale(24), height: scale(24) },
  bottomsheetIndicatorStyle: {
    backgroundColor: Color.grayScale3,
    width: moderateScale(60),
  },
});
