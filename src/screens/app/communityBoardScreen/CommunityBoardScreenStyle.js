import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { scale, verticalScale } from '../../../utils/Responsive';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  tabIcon: { width: scale(16), height: verticalScale(16) },
  tabComponent: { margin: scale(20) },
  fabButton: { alignSelf: 'flex-end', margin: scale(20) },
  fabIcon: { width: scale(40), height: verticalScale(40) },
});
