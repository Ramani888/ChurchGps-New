// import { Image, StyleSheet, Text, View } from 'react-native';
// import React, { memo, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Color from '../../utils/Color';
// import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
// import { Fonts } from '../../utils/Font';
// import GradientText from '../GradientText';
// import { strings } from '../../language/strings';
// import { Images } from '../../utils/Images';
// import ToggleSwitch from 'toggle-switch-react-native';

// const SettingComponent = ({ label, isOn, onToggle }) => {
//   return (
//     <View style={styles.settingView}>
//       <Text style={styles.settingTitle}>{label}</Text>
//       <ToggleSwitch
//         isOn={isOn}
//         onColor={Color.theme1}
//         offColor={Color.rgba.Gray[5]}
//         size="medium"
//         onToggle={onToggle}
//       />
//     </View>
//   );
// };

// const AdminRightsBottomsheetContent = () => {
//   const [deleteMessage, setDeleteMessage] = useState(false);
//   const [banUser, setBanUser] = useState(false);
//   const [pinMessage, setPinMessage] = useState(false);
//   const [addNewAdmin, setAddNewAdmin] = useState(false);
//   const [startVoiceChat, setStartVoiceChat] = useState(false);
//   const [createPoll, setCreatePoll] = useState(false);
//   const [removeAdmins, setRemoveAdmins] = useState(false);
//   const [modifyCalender, setModifyCalender] = useState(false);

//   const onToggleDeleteMessage = () => {
//     setDeleteMessage(!deleteMessage);
//   };

//   const onToggleBanUser = () => {
//     setBanUser(!banUser);
//   };

//   const onTogglePinMessage = () => {
//     setPinMessage(!pinMessage);
//   };

//   const onToggleAddNewAdmins = () => {
//     setAddNewAdmin(!addNewAdmin);
//   };

//   const onToggleStartVoiceChat = () => {
//     setStartVoiceChat(!startVoiceChat);
//   };

//   const onToggleCreatePoll = () => {
//     setCreatePoll(!createPoll);
//   };

//   const onToggleRemoveAdmins = () => {
//     setRemoveAdmins(!removeAdmins);
//   };

//   const onToggleModifyCalender = () => {
//     setModifyCalender(!modifyCalender);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <GradientText text={strings.adminRights} colors={Color.gradientColor1} style={styles.title} />

//       <View style={styles.devider} />

//       <View>
//         <Image source={Images.deleteIcon} tintColor={Color.Pink} style={styles.deleteIcon} />
//         <Image
//           source={{
//             uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
//           }}
//           style={styles.image}
//         />
//         <Text style={styles.adminName}>Alfredo Bator</Text>
//       </View>

//       <View>
//         <Text style={styles.heading}>What Can This Admin Do?</Text>

//         <SettingComponent
//           label={strings.deleteMessage}
//           isOn={deleteMessage}
//           onToggle={onToggleDeleteMessage}
//         />

//         <SettingComponent label={strings.banUser} isOn={banUser} onToggle={onToggleBanUser} />

//         <SettingComponent
//           label={strings.pinMessage}
//           isOn={pinMessage}
//           onToggle={onTogglePinMessage}
//         />

//         <SettingComponent
//           label={strings.addNewAdmins}
//           isOn={addNewAdmin}
//           onToggle={onToggleAddNewAdmins}
//         />

//         <SettingComponent
//           label={strings.startVoiceChat}
//           isOn={startVoiceChat}
//           onToggle={onToggleStartVoiceChat}
//         />

//         <SettingComponent
//           label={strings.createPoll}
//           isOn={createPoll}
//           onToggle={onToggleCreatePoll}
//         />

//         <SettingComponent
//           label={strings.removeAdmins}
//           isOn={removeAdmins}
//           onToggle={onToggleRemoveAdmins}
//         />

//         <SettingComponent
//           label={strings.modifyCalender}
//           isOn={modifyCalender}
//           onToggle={onToggleModifyCalender}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default memo(AdminRightsBottomsheetContent);

// const styles = StyleSheet.create({
//   container: { padding: scale(22) },
//   title: {
//     fontSize: moderateScale(24),
//     fontFamily: Fonts.spaceGroteskBold,
//     textAlign: 'center',
//     marginTop: verticalScale(-10),
//   },
//   devider: {
//     width: scale(331),
//     height: verticalScale(1),
//     backgroundColor: Color.rgba.Gray[2],
//     marginVertical: verticalScale(15),
//   },
//   deleteIcon: {
//     width: scale(24),
//     height: scale(24),
//     position: 'absolute',
//     right: scale(10),
//     top: verticalScale(10),
//   },
//   image: {
//     width: scale(80),
//     height: scale(80),
//     borderRadius: scale(40),
//     alignSelf: 'center',
//     marginVertical: verticalScale(10),
//   },
//   adminName: {
//     fontSize: moderateScale(17),
//     fontFamily: Fonts.interBold,
//     color: Color.Black,
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: moderateScale(16),
//     color: Color.Black,
//     fontFamily: Fonts.interSemiBold,
//     marginTop: verticalScale(12),
//   },
//   settingView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: verticalScale(15),
//   },
//   settingTitle: {
//     fontSize: moderateScale(14),
//     color: Color.Black,
//     fontFamily: Fonts.interRegular,
//   },
// });

import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';

import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import { Images } from '../../utils/Images';
import CustomButton from '../../custome/CustomButton';

/* ---------- constants ---------- */

const ADMIN_AVATAR_SOURCE = {
  uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
};

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

const AdminRightsBottomsheetContent = () => {
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
      <View style={styles.indicator} />
      <GradientText text={strings.adminRights} colors={Color.gradientColor1} style={styles.title} />

      <View style={styles.devider} />

      <ScrollView>
        <View>
          <Image source={Images.deleteIcon} tintColor={Color.Pink} style={styles.deleteIcon} />
          <Image source={ADMIN_AVATAR_SOURCE} style={styles.image} />
          <Text style={styles.adminName}>Alfredo Bator</Text>
        </View>

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

          <CustomButton
            title={strings.transferOwnership}
            buttonWidth={scale(331)}
            buttonHeight={verticalScale(53)}
            backgroundColor={Color.theme1}
            borderRadius={scale(30)}
            fontSize={moderateScale(16)}
            fontColor={Color.Black}
            fontFamily={Fonts.sfProBold}
            marginTop={verticalScale(10)}
            marginBottom={verticalScale(15)}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(AdminRightsBottomsheetContent);

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  container: { padding: scale(22) },
  indicator: {
    width: scale(66),
    height: verticalScale(4),
    borderRadius: scale(2),
    backgroundColor: Color.Gray,
    alignSelf: 'center',
    marginTop: verticalScale(-10),
    marginBottom: verticalScale(30),
  },
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
  heading: {
    fontSize: moderateScale(16),
    color: Color.Black,
    fontFamily: Fonts.interSemiBold,
    marginTop: verticalScale(12),
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
  btnView: { marginVertical: verticalScale(15) },
});
