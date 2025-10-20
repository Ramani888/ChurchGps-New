// BottomFadeLinear.jsx
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function BottomFadeLinear({
  height = 200,
  color = '#FFFFFF',
  bottomOpacity = 1, // darkest at bottom
  midOpacity = 0.6, // softer in the middle
  topOpacity = 0, // fully transparent at top
  midAt = 0.55, // where the mid stop is placed (0..1)
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      style={[styles.fade, { height }]}
      // bottom -> top
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      colors={[
        `rgba(255,255,255,${bottomOpacity})`, // bottom: dark white
        `rgba(255,255,255,${midOpacity})`, // middle: lighter
        `rgba(255,255,255,${topOpacity})`, // top: transparent
      ]}
      locations={[0, midAt, 1]}
    />
  );
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
