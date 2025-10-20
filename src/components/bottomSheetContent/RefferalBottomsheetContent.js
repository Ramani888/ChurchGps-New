import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';

const RefferalBottomsheetContent = () => {
  return (
    <View style={styles.bottomsheetView}>
      <GradientText
        text={strings.refferalBadges}
        colors={Color.gradientColor1}
        style={styles.subscriptionHeading}
      />
      <View style={styles.devider} />

      <Text style={styles.text}>{strings.refferalBottomsheetText}</Text>
    </View>
  );
};

export default RefferalBottomsheetContent;

const styles = StyleSheet.create({
  bottomsheetView: { padding: scale(10) },
  subscriptionHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
  },
  devider: {
    borderBottomWidth: scale(1),
    width: scale(331),
    borderColor: Color.rgba.Gray[2],
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  text: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interMedium,
    lineHeight: verticalScale(24),
    color: Color.Black,
    textAlign: 'center',
    paddingBottom: verticalScale(20),
  },
});
