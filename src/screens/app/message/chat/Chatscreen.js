import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Image, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { styles } from './ChatscreenStyle';
import { moderateScale, scale, verticalScale } from '../../../../utils/Responsive';
import Color from '../../../../utils/Color';
import { Images } from '../../../../utils/Images';
import { strings } from '../../../../language/strings';
import CustomBottomsheet from '../../../../custome/CustomBottomsheet';
import InfoBottomsheetContent from '../../../../components/bottomSheetContent/InfoBottomsheetContent';
import MembersBottomsheetContent from '../../../../components/bottomSheetContent/MembersBottomsheetContent';
import BanBottomsheetContent from '../../../../components/bottomSheetContent/BanBottomsheetContent';
import AdminRightsBottomsheetContent from '../../../../components/bottomSheetContent/AdminRightsBottomsheetContent';
import TransferOwnerBottomsheetContent from '../../../../components/bottomSheetContent/TransferOwnerBottomsheetContent';
import RemoveAdminBottomsheetContent from '../../../../components/bottomSheetContent/RemoveAdminBottomsheetContent';
import MemberPermissionBottomsheetContent from '../../../../components/bottomSheetContent/MemberPermissionBottomsheetContent';
import ChangeBackgroundBottomsheetContent from '../../../../components/bottomSheetContent/ChangeBackgroundBottomsheetContent';
import ChatComponent from '../../../../components/message/ChatComponent';
import { Shadow } from 'react-native-shadow-2';
import { BlurView } from '@react-native-community/blur';

const HeaderMenuItem = memo(function HeaderMenuItem({ icon, label, onSelect }) {
  return (
    <MenuOption onSelect={onSelect}>
      <View style={styles.menuView}>
        <Image source={icon} style={styles.menuImage} />
        <Text style={styles.menuText}>{label}</Text>
      </View>
    </MenuOption>
  );
});

const Chatscreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const infoSheetRef = useRef();
  const membersSheetRef = useRef();
  const banSheetRef = useRef();
  const adminRightsSheetRef = useRef();
  const transferOwnerSheetRef = useRef();
  const removeAdminSheetRef = useRef();
  const memberPermissionSheetRef = useRef();
  const changeBackgroundSheetRef = useRef();

  const [notification, setNotification] = useState(false);
  const [searchFieldVisible, setSearchFieldVisible] = useState(false);
  const [blurVisible, setBlurVisible] = useState(false);

  const { userName = '', image = '' } = route?.params ?? {};

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onToggleNotification = useCallback(() => {
    setNotification(prev => !prev);
  }, []);

  const menuActions = useMemo(
    () => [
      {
        key: 'info',
        icon: Images.infoIcon,
        label: strings.info,
        onSelect: () => openInfoBottomsheet(),
      },
      {
        key: 'members',
        icon: Images.chatMultiuserIcon,
        label: strings.members,
        onSelect: () => openMembersBottomsheet(),
      },
      {
        key: 'leave',
        icon: Images.leaveIcon,
        label: strings.leave,
        onSelect: () => {},
      },
      {
        key: 'report',
        icon: Images.reportIcon,
        label: strings.report,
        onSelect: () => {},
      },
      {
        key: 'search',
        icon: Images.searchIcon1,
        label: strings.search,
        onSelect: () => setSearchFieldVisible(true),
      },
    ],
    [],
  );

  const headerImageSource = useMemo(() => {
    return image ? { uri: image } : Images.userPlaceholder;
  }, [image]);

  const openInfoBottomsheet = useCallback(() => {
    infoSheetRef.current.show();
  }, []);

  const openMembersBottomsheet = useCallback(() => {
    membersSheetRef.current.show();
  }, []);

  const closeMembersBottomsheet = useCallback(() => {
    membersSheetRef.current.hide();
  }, []);

  const openBanBottomsheet = useCallback(() => {
    banSheetRef.current.show();
  }, []);

  const openAdminRightsBottomsheet = useCallback(() => {
    adminRightsSheetRef.current.show();
  }, []);

  const closeAdminRightsBottomsheet = useCallback(() => {
    adminRightsSheetRef.current.hide();
  }, []);

  const openTransferOwnerBottomsheet = useCallback(() => {
    transferOwnerSheetRef.current.show();
  }, []);

  const openRemoveAdminBottomsheet = useCallback(() => {
    removeAdminSheetRef.current.show();
  }, []);

  const openMemberPermissionBottomsheet = useCallback(() => {
    memberPermissionSheetRef.current.show();
  }, []);

  const openChangeBackgroundBottomsheet = useCallback(() => {
    changeBackgroundSheetRef.current.show();
  }, []);

  const closeChangeBackgroundBottomsheet = useCallback(() => {
    changeBackgroundSheetRef.current.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.White} />
      <Shadow
        distance={2}
        startColor="rgba(0,0,0,0.04)"
        offset={[0, 1]}
        containerViewStyle={{ width: '100%' }}
        style={{ width: '100%' }}
      >
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
            <AntDesign name="left" size={scale(16)} color={Color.Black} />
          </Pressable>

          <Image source={headerImageSource} style={styles.userImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.memberLength}>8 Member</Text>
          </View>

          <View style={styles.headerIconView}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <Image source={Images.pinIcon} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <Image source={Images.calenderIcon} style={styles.icon} />
            </TouchableOpacity>

            <Menu>
              <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
                <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
              </MenuTrigger>

              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuPopup,
                }}
              >
                {menuActions.map(item => (
                  <>
                    <HeaderMenuItem
                      key={item.key}
                      icon={item.icon}
                      label={item.label}
                      onSelect={item.onSelect}
                    />
                    <View style={styles.devider} />
                  </>
                ))}

                <MenuOption>
                  <Text style={[styles.menuText, { textAlign: 'center' }]}>
                    {strings.notification}
                  </Text>

                  <View style={[styles.menuView, styles.switchView]}>
                    <Text style={[styles.menuText, { fontSize: moderateScale(14) }]}>
                      {strings.off}
                    </Text>

                    <ToggleSwitch
                      isOn={notification}
                      onColor={Color.theme1}
                      offColor={Color.rgba.Gray[5]}
                      size="medium"
                      onToggle={onToggleNotification}
                    />

                    <Text style={[styles.menuText, { fontSize: moderateScale(14) }]}>
                      {strings.on}
                    </Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </Shadow>

      <ChatComponent
        searchFieldVisible={searchFieldVisible}
        setSearchFieldVisible={setSearchFieldVisible}
        openChangeBackgroundBottomsheet={openChangeBackgroundBottomsheet}
      />

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={infoSheetRef} setBlurVisible={setBlurVisible}>
        <InfoBottomsheetContent image={image} userName={userName} />
      </CustomBottomsheet>

      <CustomBottomsheet ref={membersSheetRef} isModal={false} setBlurVisible={setBlurVisible}>
        <MembersBottomsheetContent
          closeMembersBottomsheet={closeMembersBottomsheet}
          openBanBottomsheet={openBanBottomsheet}
          openAdminRightsBottomsheet={openAdminRightsBottomsheet}
          openMemberPermissionBottomsheet={openMemberPermissionBottomsheet}
        />
      </CustomBottomsheet>

      <CustomBottomsheet ref={banSheetRef} setBlurVisible={setBlurVisible}>
        <BanBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet
        ref={adminRightsSheetRef}
        gestureEnabled={false}
        height={'93%'}
        setBlurVisible={setBlurVisible}
      >
        <AdminRightsBottomsheetContent
          closeAdminRightsBottomsheet={closeAdminRightsBottomsheet}
          openTransferOwnerBottomsheet={openTransferOwnerBottomsheet}
          openRemoveAdminBottomsheet={openRemoveAdminBottomsheet}
        />
      </CustomBottomsheet>

      <CustomBottomsheet ref={transferOwnerSheetRef} setBlurVisible={setBlurVisible}>
        <TransferOwnerBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={removeAdminSheetRef} setBlurVisible={setBlurVisible}>
        <RemoveAdminBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={memberPermissionSheetRef} setBlurVisible={setBlurVisible}>
        <MemberPermissionBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={changeBackgroundSheetRef} setBlurVisible={setBlurVisible}>
        <ChangeBackgroundBottomsheetContent
          closeChangeBackgroundBottomsheet={closeChangeBackgroundBottomsheet}
        />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

export default memo(Chatscreen);
