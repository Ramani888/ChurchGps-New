import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Images } from '../../utils/Images';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeaveBottomsheetContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image source={Images.deleteIcon} style={styles.icon} />
        <Text style={styles.text}>{strings.delete}</Text>
      </View>
      <View style={styles.row}>
        <Image source={Images.blockIcon} style={styles.icon} />
        <Text style={styles.text}>{strings.block}</Text>
      </View>
      <View style={styles.row}>
        <Image source={Images.infoIcon} style={styles.icon} />
        <Text style={styles.text}>{strings.report}</Text>
      </View>
    </SafeAreaView>
  );
};

export default memo(LeaveBottomsheetContent);

const styles = StyleSheet.create({
  container: { backgroundColor: Color.White, padding: scale(22) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    backgroundColor: Color.rgba.Gray[1],
    width: scale(331),
    height: verticalScale(56),
    paddingHorizontal: scale(10),
    borderRadius: scale(16),
    marginBottom: verticalScale(10),
  },
  icon: { width: scale(24), height: scale(24) },
  text: { fontSize: moderateScale(16), fontFamily: Fonts.interSemiBold, color: Color.Black },
});
