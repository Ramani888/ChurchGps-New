import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';
import CustomButton from '../../custome/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/NavigationKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserDetail } from '../../context/UserContext';

const SuccessBottomsheetContent = () => {
  const navigation = useNavigation();
  const { user } = useUserDetail();

  const handleProfileNavigate = useCallback(async () => {
    await AsyncStorage.setItem(`SETUP_ACCOUNT_${user?._id}`, 'false');
    navigation.navigate(screenName.myAccount);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image/success.png')} style={styles.image} />
      <View style={styles.textView}>
        <Text style={styles.title}>{strings.signupSuccessTitle}</Text>
        <Text style={styles.subTitle}>{strings.signupSuccessSubTitle}</Text>
      </View>

      <CustomButton
        title={strings.finishProfileSetup}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(20)}
        marginBottom={verticalScale(10)}
        onPress={handleProfileNavigate}
      />
    </View>
  );
};

export default memo(SuccessBottomsheetContent);

const styles = StyleSheet.create({
  container: { margin: scale(20) },
  image: {
    width: scale(158),
    height: verticalScale(114),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  textView: { alignItems: 'center', marginTop: verticalScale(10) },
  title: {
    fontSize: scale(24),
    fontFamily: Fonts.interMedium,
    color: Color.Black,
  },
  subTitle: {
    fontSize: scale(14),
    fontFamily: Fonts.interRegular,
    color: Color.rgba.Black[4],
    marginTop: verticalScale(5),
  },
});
