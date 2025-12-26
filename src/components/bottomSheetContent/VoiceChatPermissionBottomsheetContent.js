import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import CustomButton from '../../custome/CustomButton';
import { Shadow } from 'react-native-shadow-2';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Images } from '../../utils/Images';

const memberData = [
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti1',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti2',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti3',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti4',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
];

const VoiceChatPermissionBottomsheetContent = () => {
  const [muteMember, setMuteMember] = useState([]);
  const [mute, setMute] = useState(false);

  const toggleMute = useCallback(name => {
    setMuteMember(prev => (prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]));
  }, []);

  const renderMembers = useCallback(
    ({ item }) => {
      const isMuted = muteMember.includes(item.name);

      return (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item?.image }} style={styles.memberImage} />
          <View>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.userName}>{item?.userName}</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={() => toggleMute(item.name)}>
              <Image
                source={isMuted ? Images.muteIcon : Images.microphoneIcon}
                style={styles.microphoneImage}
                tintColor={Color.Black}
              />
            </TouchableOpacity>
            <Menu rendererProps={{ placement: 'auto' }}>
              <MenuTrigger>
                <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuPopup,
                }}
              >
                <MenuOption onSelect={() => {}}>
                  <Text style={styles.menuText}>{strings.kick}</Text>
                </MenuOption>
                <View style={styles.menuDevider} />
                <MenuOption onSelect={() => {}}>
                  <Text style={styles.menuText}>{strings.mute}</Text>
                </MenuOption>
                <View style={styles.menuDevider} />
                <MenuOption onSelect={() => {}}>
                  <Text style={styles.menuText}>{strings.allowToSpeak}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      );
    },
    [muteMember],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Shadow style={styles.shadowView}>
        <View style={styles.topView}>
          <View>
            <Text style={styles.headingText}>{strings.voiceChat}</Text>
            <Text style={[styles.headingText, styles.mediumText]}>General Discussion</Text>
            <Text style={styles.text}>8 Members</Text>
          </View>
          <View style={styles.endBtnView}>
            <CustomButton
              title={strings.end}
              buttonWidth={scale(87)}
              buttonHeight={verticalScale(38)}
              backgroundColor={Color.Pink}
              borderRadius={scale(30)}
              fontSize={moderateScale(12)}
              fontColor={Color.White}
              fontFamily={Fonts.interSemiBold}
              onPress={() => {}}
            />
            <Text />
            <Text style={styles.text}>Active 43 Minutes</Text>
          </View>
        </View>
      </Shadow>

      <FlatList data={memberData} renderItem={renderMembers} />

      <CustomButton
        title={strings.leave}
        buttonWidth={scale(204)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.Pink}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.White}
        fontFamily={Fonts.sfProBold}
        marginVertical={verticalScale(20)}
        onPress={() => {}}
      />

      <Shadow style={styles.bottomShadowView}>
        <TouchableOpacity onPress={() => setMute(!mute)} style={styles.bottomIconView}>
          <Image
            source={mute ? Images.muteIcon : Images.microphoneIcon}
            style={styles.microphoneImage}
            tintColor={Color.Black}
          />
          <Text style={styles.text}>{strings.mute}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.bottomIconView}>
          {/* <Image
            source={mute ? Images.muteIcon : Images.microphoneIcon}
            style={styles.microphoneImage}
            tintColor={Color.Black}
          /> */}
          <Text style={styles.handImage}>👋</Text>
          <Text style={styles.text}>{strings.speakRequest}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.bottomIconView}>
          <Image
            source={Images.removeIcon}
            style={styles.microphoneImage}
            tintColor={Color.Black}
          />
          <Text style={styles.text}>{strings.minimize}</Text>
        </TouchableOpacity>
      </Shadow>
    </SafeAreaView>
  );
};

export default memo(VoiceChatPermissionBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(22),
    paddingTop: verticalScale(20),
  },
  shadowView: {
    width: '100%',
  },
  topView: {
    backgroundColor: '#FAFFEA',
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scale(24),
    borderWidth: scale(2),
    borderColor: Color.White,
  },
  headingText: { fontSize: moderateScale(14), fontFamily: Fonts.interBold, color: Color.Black },
  text: { fontSize: moderateScale(12), fontFamily: Fonts.interRegular, color: Color.Black },
  mediumText: { fontFamily: Fonts.interMedium },
  endBtnView: { justifyContent: 'flex-end' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
    marginTop: verticalScale(18),
  },
  memberImage: { width: scale(40), height: scale(40), borderRadius: scale(20) },
  name: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    width: scale(211),
  },
  userName: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    marginTop: verticalScale(-3),
    width: scale(211),
  },
  menuPopup: {
    width: scale(160),
    padding: scale(16),
    marginTop: verticalScale(33),
    borderRadius: scale(20),
  },
  menuText: { fontSize: moderateScale(16), fontFamily: Fonts.interRegular, color: Color.Black },
  menuDevider: {
    width: scale(128),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(2),
  },
  iconView: { flexDirection: 'row', alignItems: 'center', gap: scale(10) },
  microphoneImage: { width: scale(24), height: scale(24) },
  bottomShadowView: {
    width: scale(331),
    height: verticalScale(84),
    borderRadius: scale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomIconView: { alignItems: 'center' },
  handImage: { fontSize: moderateScale(20) },
});
