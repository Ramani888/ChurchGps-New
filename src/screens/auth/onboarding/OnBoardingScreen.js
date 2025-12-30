import React, { memo, useCallback } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import GradientText from '../../../components/GradientText';
import BottomFadeLinear from '../../../components/BottomFadeLinear';
import CustomButton from '../../../custome/CustomButton';
import { strings } from '../../../language/strings';
import { screenName } from '../../../utils/NavigationKey';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';

import { styles } from './OnBoardingStyle';

const OnBoardingScreen = () => {
  const navigation = useNavigation();

  const handleSignUpPress = useCallback(() => {
    navigation.navigate(screenName.signUp);
  }, [navigation]);

  const handleLoginPress = useCallback(() => {
    navigation.navigate(screenName.login);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      
      <Image
        source={Images.gpsMobileImage}
        style={styles.gpsImage}
        resizeMode="contain"
        fadeDuration={0}
      />
      
      <View style={styles.fadeContainer}>
        <BottomFadeLinear
          height={350}
          bottomOpacity={1}
          midOpacity={1}
          topOpacity={0}
          midAt={0.5}
        />
      </View>
      
      <View style={styles.titleView}>
        <GradientText
          text={strings.churchGps}
          colors={Color.gradientColor1}
          style={styles.title}
        />
        <Text style={styles.subTitle}>{strings.createOrJoinString}</Text>
      </View>
      
      <CustomButton
        title={strings.login}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        marginBottom={verticalScale(10)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        onPress={handleLoginPress}
      />
      
      <CustomButton
        title={strings.signup}
        backgroundColor={Color.theme2}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.White}
        fontFamily={Fonts.sfProBold}
        onPress={handleSignUpPress}
      />
    </SafeAreaView>
  );
};

export default memo(OnBoardingScreen);
