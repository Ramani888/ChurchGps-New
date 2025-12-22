import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import { Images } from '../../utils/Images';

const InfoBottomsheetContent = ({ image, userName }) => {
  console.log('image', image);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Image source={{ uri: image }} style={styles.groupImage} />
        <GradientText text={userName} colors={Color.gradientColor1} style={styles.title} />
        <Image source={Images.editIcon} style={styles.editIcon} />
      </View>
      <View style={styles.devider} />
    </SafeAreaView>
  );
};

export default memo(InfoBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(22),
    paddingTop: verticalScale(13),
  },
  headerView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupImage: { width: scale(40), height: scale(40) },
  title: { fontSize: moderateScale(24), fontFamily: Fonts.spaceGroteskBold },
  editIcon: { width: scale(24), height: scale(24) },
  devider: {
    width: scale(331),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
});
