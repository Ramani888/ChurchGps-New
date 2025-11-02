import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import CheckBox from '../../custome/CustomCheckbox';
import CustomButton from '../../custome/CustomButton';

const SwitchModeBottomsheetContent = () => {
  const [mode, setMode] = useState('local');

  return (
    <View>
      <GradientText
        text={strings.switch}
        colors={Color.gradientColor1}
        style={styles.switchHeading}
      />
      <View style={styles.devider} />
      <Text style={styles.selectMode}>{strings.selectMode}</Text>
      <View style={styles.modeContainer}>
        <View style={styles.imageView}>
          <Text style={styles.text}>{strings.local}</Text>
          <Image
            source={Images.localImage}
            style={styles.image}
            resizeMode="contain"
          />
          <CheckBox
            onPress={() => setMode('local')}
            isChecked={mode === 'local'}
            checkboxColor={Color.theme1}
            checkboxSize={scale(22)}
          />
        </View>
        <View style={styles.imageView}>
          <Text style={styles.text}>{strings.online}</Text>
          <Image
            source={Images.onlineImage}
            style={styles.image}
            resizeMode="contain"
          />
          <CheckBox
            onPress={() => setMode('online')}
            isChecked={mode === 'online'}
            checkboxColor={Color.theme1}
            checkboxSize={scale(22)}
          />
        </View>
      </View>

      <CustomButton
        title={strings.confirm}
        buttonWidth={scale(331)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginBottom={verticalScale(20)}
        onPress={() => {}}
      />
    </View>
  );
};

export default SwitchModeBottomsheetContent;

const styles = StyleSheet.create({
  switchHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  devider: {
    borderBottomWidth: scale(1),
    width: scale(331),
    borderColor: Color.rgba.Gray[2],
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  selectMode: {
    color: Color.Black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(24),
    textAlign: 'center',
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageView: { alignItems: 'center', marginVertical: verticalScale(20) },
  text: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  image: {
    width: scale(105),
    height: verticalScale(100),
    marginVertical: verticalScale(10),
  },
});
