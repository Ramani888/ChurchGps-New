import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import { Images } from '../../utils/Images';

const AdminRightsBottomsheetContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GradientText text={strings.adminRights} colors={Color.gradientColor1} style={styles.title} />

      <View style={styles.devider} />

      <View>
        <Image source={Images.deleteIcon} tintColor={Color.Pink} style={styles.deleteIcon} />
        <Image
          source={{
            uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
          }}
          style={styles.image}
        />
        <Text style={styles.adminName}>Alfredo Bator</Text>
      </View>

      <View>
        <Text style={styles.heading}>What Can This Admin Do?</Text>
      </View>
    </SafeAreaView>
  );
};

export default memo(AdminRightsBottomsheetContent);

const styles = StyleSheet.create({
  container: { padding: scale(22) },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(-10),
  },
  devider: {
    width: scale(331),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginVertical: verticalScale(15),
  },
  deleteIcon: {
    width: scale(24),
    height: scale(24),
    position: 'absolute',
    right: scale(10),
    top: verticalScale(10),
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  adminName: {
    fontSize: moderateScale(17),
    fontFamily: Fonts.interBold,
    color: Color.Black,
    textAlign: 'center',
  },
});
