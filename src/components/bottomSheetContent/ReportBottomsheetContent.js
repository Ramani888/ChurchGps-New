import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import CustomInputField from '../../custome/CustomInputField';
import { strings } from '../../language/strings';
import CustomButton from '../../custome/CustomButton';

const ReportBottomsheetContent = () => {
  const [report, setReport] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <GradientText text={'Report David?'} colors={Color.gradientColor1} style={styles.title} />

      <View style={styles.userView}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
          }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>@davidmoyes_</Text>
      </View>

      <CustomInputField
        placeholder={strings.enterReport}
        onChangeText={setReport}
        value={report}
        multiline
        numberOfLines={4}
        inputStyle={styles.inputStyle}
      />

      <CustomButton
        title={strings.send}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(5)}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default ReportBottomsheetContent;

const styles = StyleSheet.create({
  container: { backgroundColor: Color.White, padding: scale(22), paddingTop: verticalScale(5) },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginVertical: verticalScale(10),
  },
  userImage: { width: scale(28), height: scale(28) },
  userName: { fontSize: moderateScale(14), fontFamily: Fonts.interRegular, color: Color.Black },
  inputStyle: {
    backgroundColor: Color.rgba.Gray[1],
    marginTop: verticalScale(6),
    borderRadius: scale(16),
    height: verticalScale(46),
  },
});
