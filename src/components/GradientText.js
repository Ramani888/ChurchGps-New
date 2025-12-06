import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../utils/Responsive';
import { Fonts } from '../utils/Font';

const GradientText = ({ text, colors, style, titleLocations, ...props }) => {
  return (
    <MaskedView maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[styles.text, style, { opacity: 0 }]} {...props}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.bold,
  },
});

{
  /* <GradientText
  text="Hello Gradient"
  colors={['#ff7e5f', '#feb47b']} // from orange → light orange
  style={{ fontSize: 32 }}
/>; */
}
