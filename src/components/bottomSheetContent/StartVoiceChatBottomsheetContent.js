import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import CustomInputField from '../../custome/CustomInputField';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomButton from '../../custome/CustomButton';

const StartVoiceChatBottomsheetContent = ({
  closeStartVoiceChatBottomsheet,
  setStartVoiceChat,
}) => {
  const [discussion, setDiscussion] = useState('');
  const [switchOn, setSwitchOn] = useState(false);

  const onToggle = useCallback(() => {
    setSwitchOn(!switchOn);
  }, [switchOn]);

  return (
    <SafeAreaView style={styles.container}>
      <GradientText
        text={strings.startGroupVoiceChat}
        colors={Color.gradientColor1}
        style={styles.headingText}
      />

      <Text style={styles.title}>Title</Text>

      <CustomInputField
        placeholder={strings.generalDiscussion}
        onChangeText={setDiscussion}
        value={discussion}
        inputStyle={styles.inputStyle}
      />

      <View style={styles.toggleView}>
        <Text style={styles.text}>{strings.anyoneCanSpeak}</Text>
        <ToggleSwitch
          isOn={switchOn}
          onColor={Color.theme1}
          offColor={Color.rgba.Gray[2]}
          size="medium"
          onToggle={onToggle}
        />
        <Text style={styles.text}>{strings.givePermissionToSpeak}</Text>
      </View>

      <CustomButton
        title={strings.start}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginVertical={verticalScale(21)}
        onPress={() => {
          setStartVoiceChat(true);
          closeStartVoiceChatBottomsheet();
        }}
      />
    </SafeAreaView>
  );
};

export default memo(StartVoiceChatBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(22),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    overflow: 'hidden',
  },
  headingText: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  inputStyle: {
    width: scale(331),
    height: verticalScale(44),
    borderRadius: scale(16),
    backgroundColor: Color.rgba.Gray[1],
    paddingHorizontal: scale(16),
    marginVertical: scale(15),
  },
  toggleView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    lineHeight: verticalScale(20),
    width: scale(109),
    textAlign: 'center',
  },
});
