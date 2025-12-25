import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import GradientText from '../GradientText';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import CustomButton from '../../custome/CustomButton';

const CommunityBoardInformationContent = ({ closeBottomsheet }) => {
  return (
    <View>
      <GradientText text={strings.information} colors={Color.gradientColor1} style={styles.title} />
      <Text style={styles.text}>{strings.communityInformationText1}</Text>
      <Text style={styles.text}>{strings.communityInformationText2}</Text>

      <CustomButton
        title={strings.close}
        backgroundColor={Color.theme1}
        buttonHeight={verticalScale(53)}
        buttonWidth={scale(331)}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        onPress={closeBottomsheet}
        marginTop={verticalScale(10)}
        marginBottom={verticalScale(20)}
      />
    </View>
  );
};

export default CommunityBoardInformationContent;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    alignSelf: 'center',
    paddingTop: verticalScale(10),
    letterSpacing: scale(-1),
  },
  text: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(20),
    marginVertical: verticalScale(13),
    textAlign: 'center',
    color: Color.Gray,
    width: scale(331),
    alignSelf: 'center',
  },
});
