import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomButton from '../../custome/CustomButton';

const SettingRow = memo(({ label, isOn, onToggle }) => {
  return (
    <View style={styles.settingView}>
      <Text style={styles.settingTitle}>{label}</Text>
      <ToggleSwitch
        isOn={isOn}
        onColor={Color.theme1}
        offColor={Color.Pink}
        size="medium"
        onToggle={onToggle}
      />
    </View>
  );
});

const MemberPermissionBottomsheetContent = () => {
  const [rights, setRights] = useState({
    deleteMessage: false,
    banUser: false,
    pinMessage: false,
    addNewAdmin: false,
    startVoiceChat: false,
    createPoll: false,
    removeAdmins: false,
    modifyCalender: false,
  });

  const toggleRight = useCallback(key => {
    setRights(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const settings = useMemo(
    () => [
      { key: 'deleteMessage', label: strings.deleteMessage },
      { key: 'banUser', label: strings.banUser },
      { key: 'pinMessage', label: strings.pinMessage },
      { key: 'addNewAdmin', label: strings.addNewAdmins },
      { key: 'startVoiceChat', label: strings.startVoiceChat },
      { key: 'createPoll', label: strings.createPoll },
      { key: 'removeAdmins', label: strings.removeAdmins },
      { key: 'modifyCalender', label: strings.modifyCalender },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <GradientText
        text={strings.memberPermissions}
        colors={Color.gradientColor1}
        style={styles.title}
      />
      <View style={styles.devider} />

      <View>
        <Text style={styles.heading}>What Can This Admin Do?</Text>

        {settings.map(item => (
          <SettingRow
            key={item.key}
            label={item.label}
            isOn={rights[item.key]}
            onToggle={() => toggleRight(item.key)}
          />
        ))}
      </View>

      <View style={styles.btnView}>
        <CustomButton
          title={strings.save}
          buttonWidth={scale(331)}
          buttonHeight={verticalScale(53)}
          backgroundColor={Color.theme1}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.Black}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(10)}
          onPress={() => {}}
        />

        <CustomButton
          title={strings.back}
          buttonWidth={scale(331)}
          buttonHeight={verticalScale(53)}
          backgroundColor={Color.theme2}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.White}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(10)}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(MemberPermissionBottomsheetContent);

const styles = StyleSheet.create({
  container: { padding: scale(22), paddingTop: verticalScale(5) },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  devider: {
    width: scale(331),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginVertical: verticalScale(15),
  },
  heading: {
    fontSize: moderateScale(16),
    color: Color.Black,
    fontFamily: Fonts.interSemiBold,
    marginTop: verticalScale(3),
  },
  settingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  settingTitle: {
    fontSize: moderateScale(14),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
  },
  btnView: { marginTop: verticalScale(15) },
});
