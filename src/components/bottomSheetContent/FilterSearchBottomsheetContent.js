import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { strings } from '../../language/strings';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';

const FilterSearchBottomsheetContent = () => {
  return (
    <View>
      <GradientText text={strings.search} colors={Color.gradientColor3} style={styles.heading} />
    </View>
  );
};

export default FilterSearchBottomsheetContent;

const styles = StyleSheet.create({
  heading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(10),
  },
});
