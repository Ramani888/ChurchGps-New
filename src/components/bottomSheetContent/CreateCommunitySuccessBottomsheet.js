import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import CustomButton from '../../custome/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/NavigationKey';

const CreateCommunitySuccessBottomsheet = ({ closeSuccessBottomsheet }) => {
  const navigation = useNavigation();

  const handleContinue = useCallback(() => {
    closeSuccessBottomsheet();
    setTimeout(() => {
      navigation.navigate(screenName.tabStack, {
        screen: screenName.communityBoard,
      });
    }, 10);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GradientText
        text={strings.successCreateCommunityText}
        colors={Color.gradientColor1}
        style={styles.title}
      />

      <Image source={Images.darkGridcon} style={styles.image} />

      <CustomButton
        title={strings.continue}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(8)}
        marginBottom={verticalScale(15)}
        onPress={() => handleContinue()}
      />
    </SafeAreaView>
  );
};

export default memo(CreateCommunitySuccessBottomsheet);

const styles = StyleSheet.create({
  container: { paddingHorizontal: scale(22) },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  image: {
    width: scale(60),
    height: scale(60),
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
});
