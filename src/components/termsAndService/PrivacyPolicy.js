import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';

const PrivacyPolicy = () => {
  return (
    <View>
      <Text style={styles.privacyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident
      </Text>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  privacyText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(20),
    color: Color.Black,
  },
});
