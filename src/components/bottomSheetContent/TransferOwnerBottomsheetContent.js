import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import CustomButton from '../../custome/CustomButton';

const TransferOwnerBottomsheetContent = () => {
  return (
    <SafeAreaView>
      <GradientText
        text={strings.transferringOwner}
        colors={Color.gradientColor1}
        style={styles.title}
      />

      <Text style={styles.text}>{strings.transferrinText}</Text>

      <CustomButton
        title={strings.confirm}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(5)}
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
        marginBottom={verticalScale(25)}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default memo(TransferOwnerBottomsheetContent);

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  text: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    paddingVertical: verticalScale(15),
    width: scale(331),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
