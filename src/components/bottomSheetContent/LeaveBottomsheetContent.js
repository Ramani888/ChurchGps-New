import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import CustomButton from '../../custome/CustomButton';

const LeaveBottomsheetContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GradientText
        text={`${strings.leaveGroup}?`}
        colors={Color.gradientColor1}
        style={styles.title}
      />

      <CustomButton
        title={strings.yes}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(20)}
        marginBottom={verticalScale(10)}
        onPress={() => {}}
      />

      <CustomButton
        title={strings.no}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme2}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.White}
        fontFamily={Fonts.sfProBold}
        marginBottom={verticalScale(20)}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default memo(LeaveBottomsheetContent);

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
});
