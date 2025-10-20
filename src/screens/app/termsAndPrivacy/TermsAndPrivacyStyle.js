import { StyleSheet } from 'react-native';
import Color from '../../../utils/Color';
import { scale } from '../../../utils/Responsive';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  tabComponent: { margin: scale(20) },
});
