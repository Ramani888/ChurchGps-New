import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStateContext } from '../../context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import CustomInputField from '../../custome/CustomInputField';
import { strings } from '../../language/strings';
import CustomButton from '../../custome/CustomButton';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const HeaderMenuItem = memo(function HeaderMenuItem({ icon, label, onSelect }) {
  return (
    <MenuOption onSelect={onSelect}>
      <View style={styles.menuView}>
        <Image source={icon} style={styles.menuImage} tintColor={Color.Black} />
        <Text style={styles.menuText}>{label}</Text>
      </View>
    </MenuOption>
  );
});

const ChatComponent = ({
  searchFieldVisible,
  setSearchFieldVisible,
  openChangeBackgroundBottomsheet,
}) => {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const { changeBackgroundNumber } = useStateContext();

  const menuActions = useMemo(
    () => [
      {
        key: 'photo or video',
        icon: Images.photoOrVideoIcon,
        label: strings.photoOrVideo,
        onSelect: () => openInfoBottomsheet(),
      },
      {
        key: 'document',
        icon: Images.reportIcon,
        label: strings.document,
        onSelect: () => openMembersBottomsheet(),
      },
      {
        key: 'groupVoiceChat',
        icon: Images.microphoneIcon,
        label: strings.groupVoiceChat,
        onSelect: () => {},
      },
      {
        key: 'poll',
        icon: Images.pollIcon,
        label: strings.poll,
        onSelect: () => {},
      },
      {
        key: 'color',
        icon: Images.colorIcon,
        label: strings.color,
        onSelect: () => openChangeBackgroundBottomsheet(),
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      {changeBackgroundNumber !== '1' ? (
        <LinearGradient
          colors={
            changeBackgroundNumber === '2'
              ? Color.gradientBackground2
              : changeBackgroundNumber === '3'
              ? Color.gradientBackground3
              : changeBackgroundNumber === '4'
              ? Color.gradientBackground4
              : changeBackgroundNumber === '5'
              ? Color.gradientBackground5
              : changeBackgroundNumber === '6'
              ? Color.gradientBackground6
              : changeBackgroundNumber === '7'
              ? Color.gradientBackground7
              : changeBackgroundNumber === '8'
              ? Color.gradientBackground8
              : changeBackgroundNumber === '9'
              ? Color.gradientBackground9
              : [Color.White]
          }
          style={styles.backgroundImage}
        >
          <ImageBackground
            source={Images.backgroundImage}
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.85 }}
          >
            {searchFieldVisible && (
              <>
                <View
                  style={[
                    styles.searchInput,
                    {
                      backgroundColor:
                        changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={Images.searchIcon1} style={styles.icon} tintColor={Color.Gray} />
                  </TouchableOpacity>
                  <CustomInputField
                    placeholder={strings.searchPlaceholder}
                    onChangeText={setSearch}
                    value={search}
                    inputStyle={styles.inputStyle}
                  />
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={Images.userIcon} style={styles.icon} tintColor={Color.Gray} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  title={strings.close}
                  buttonWidth={scale(96)}
                  buttonHeight={verticalScale(26)}
                  backgroundColor={
                    changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1]
                  }
                  borderRadius={scale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Gray}
                  fontFamily={Fonts.interRegular}
                  marginTop={verticalScale(5)}
                  onPress={() => setSearchFieldVisible(false)}
                />
              </>
            )}

            <View
              style={[
                styles.messageInput,
                {
                  backgroundColor:
                    changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1],
                },
              ]}
            >
              <Menu>
                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                  <Image source={Images.gridIcon} style={styles.icon} />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsContainer: styles.menuPopup,
                  }}
                >
                  {menuActions.map((item, index) => (
                    <>
                      <HeaderMenuItem
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        onSelect={item.onSelect}
                      />
                      {menuActions?.length - 1 !== index && <View style={styles.devider} />}
                    </>
                  ))}
                </MenuOptions>
              </Menu>
              <CustomInputField
                placeholder={strings.message}
                onChangeText={setMessage}
                value={message}
                inputStyle={styles.inputStyle}
              />
              <TouchableOpacity onPress={() => {}}>
                <Image source={Images.microphoneIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </LinearGradient>
      ) : (
        <>
          {searchFieldVisible && (
            <>
              <View style={styles.searchInput}>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={Images.searchIcon1} style={styles.icon} tintColor={Color.Gray} />
                </TouchableOpacity>
                <CustomInputField
                  placeholder={strings.searchPlaceholder}
                  onChangeText={setSearch}
                  value={search}
                  inputStyle={styles.inputStyle}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={Images.userIcon} style={styles.icon} tintColor={Color.Gray} />
                </TouchableOpacity>
              </View>
              <CustomButton
                title={strings.close}
                buttonWidth={scale(96)}
                buttonHeight={verticalScale(26)}
                backgroundColor={Color.rgba.Gray[2]}
                borderRadius={scale(10)}
                fontSize={moderateScale(12)}
                fontColor={Color.Gray}
                fontFamily={Fonts.interRegular}
                marginTop={verticalScale(5)}
                onPress={() => setSearchFieldVisible(false)}
              />
            </>
          )}

          <View style={styles.messageInput}>
            <Menu>
              <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                <Image source={Images.gridIcon} style={styles.icon} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuPopup,
                }}
              >
                {menuActions.map((item, index) => (
                  <>
                    <HeaderMenuItem
                      key={item.key}
                      icon={item.icon}
                      label={item.label}
                      onSelect={item.onSelect}
                    />
                    {menuActions?.length - 1 !== index && <View style={styles.devider} />}
                  </>
                ))}
              </MenuOptions>
            </Menu>
            <CustomInputField
              placeholder={strings.message}
              onChangeText={setMessage}
              value={message}
              inputStyle={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => {}}>
              <Image source={Images.microphoneIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default memo(ChatComponent);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: verticalScale(-34) },
  backgroundImage: { flex: 1 },
  searchInput: {
    zIndex: 1,
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
    marginTop: verticalScale(15),
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  messageInput: {
    zIndex: 1,
    position: 'absolute',
    bottom: verticalScale(10),
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
  },
  inputStyle: {
    width: scale(258),
    height: scale(50),
    marginTop: verticalScale(8.5),
    marginRight: scale(10),
    fontSize: moderateScale(14),
  },
  icon: { width: scale(24), height: scale(24) },
  menuPopup: {
    width: scale(211),
    padding: scale(16),
    marginTop: verticalScale(-50),
    marginLeft: -verticalScale(8),
    borderRadius: scale(20),
    backgroundColor: Color.White,
    zIndex: 1,
  },
  menuView: { flexDirection: 'row', alignItems: 'center', gap: scale(10) },
  menuImage: { width: scale(20), height: scale(20) },
  menuText: { fontSize: moderateScale(16), fontFamily: Fonts.interRegular },
  devider: {
    width: scale(179),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(2),
  },
});
