import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { styles } from './ChatscreenStyle';
import { moderateScale, scale } from '../../../../utils/Responsive';
import Color from '../../../../utils/Color';
import { Images } from '../../../../utils/Images';
import { strings } from '../../../../language/strings';
import CustomBottomsheet from '../../../../custome/CustomBottomsheet';
import InfoBottomsheetContent from '../../../../components/bottomSheetContent/InfoBottomsheetContent';
import LeaveBottomsheetContent from '../../../../components/bottomSheetContent/LeaveBottomsheetContent';
import DeleteBottomsheetContent from '../../../../components/bottomSheetContent/DeleteBottomsheetContent';
import ReportBottomsheetContent from '../../../../components/bottomSheetContent/ReportBottomsheetContent';
import MembersBottomsheetContent from '../../../../components/bottomSheetContent/MembersBottomsheetContent';
import BanBottomsheetContent from '../../../../components/bottomSheetContent/BanBottomsheetContent';
import AdminRightsBottomsheetContent from '../../../../components/bottomSheetContent/AdminRightsBottomsheetContent';

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
  const leaveSheetRef = useRef();
  const deleteSheetRef = useRef();
  const reportSheetRef = useRef();
  const banSheetRef = useRef();
  const adminRightsSheetRef = useRef();

  const [notification, setNotification] = useState(false);

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
        onSelect: () => openLeaveBottomsheet(),
      },
      {
        key: 'report',
        icon: Images.reportIcon,
        label: strings.report,
        onSelect: () => openReportBottomsheet(),
      },
      {
        key: 'search',
        icon: Images.searchIcon1,
        label: strings.search,
        onSelect: () => openDeleteBottomsheet(),
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

  const closeInfoBottomsheet = useCallback(() => {
    infoSheetRef.current.hide();
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

  const closeBanBottomsheet = useCallback(() => {
    banSheetRef.current.hide();
  }, []);

  const openLeaveBottomsheet = useCallback(() => {
    leaveSheetRef.current.show();
  }, []);

  const closeLeaveBottomsheet = useCallback(() => {
    leaveSheetRef.current.hide();
  }, []);

  const openDeleteBottomsheet = useCallback(() => {
    deleteSheetRef.current.show();
  }, []);

  const closeDeleteBottomsheet = useCallback(() => {
    deleteSheetRef.current.hide();
  }, []);

  const openReportBottomsheet = useCallback(() => {
    reportSheetRef.current.show();
  }, []);

  const closeReportBottomsheet = useCallback(() => {
    reportSheetRef.current.hide();
  }, []);

  const openAdminRightsBottomsheet = useCallback(() => {
    adminRightsSheetRef.current.show();
  }, []);

  const closeAdminRightsBottomsheet = useCallback(() => {
    adminRightsSheetRef.current.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
          <TouchableOpacity activeOpacity={0.7} onPress={() => alert('Pin')}>
            <Image source={Images.pinIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => alert('Calendar')}>
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

      <CustomBottomsheet
        ref={infoSheetRef}
        onBottomsheetClose={closeInfoBottomsheet}
        bottomSheetContent={<InfoBottomsheetContent image={image} userName={userName} />}
      />

      <CustomBottomsheet
        ref={membersSheetRef}
        onBottomsheetClose={closeMembersBottomsheet}
        isModal={false}
        bottomSheetContent={
          <MembersBottomsheetContent
            closeMembersBottomsheet={closeMembersBottomsheet}
            openBanBottomsheet={openBanBottomsheet}
            openAdminRightsBottomsheet={openAdminRightsBottomsheet}
          />
        }
      />

      <CustomBottomsheet
        ref={banSheetRef}
        onBottomsheetClose={closeBanBottomsheet}
        bottomSheetContent={<BanBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={leaveSheetRef}
        onBottomsheetClose={closeLeaveBottomsheet}
        bottomSheetContent={<LeaveBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={deleteSheetRef}
        onBottomsheetClose={closeDeleteBottomsheet}
        bottomSheetContent={<DeleteBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={reportSheetRef}
        onBottomsheetClose={closeReportBottomsheet}
        bottomSheetContent={<ReportBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={adminRightsSheetRef}
        gestureEnabled={true}
        onBottomsheetClose={closeAdminRightsBottomsheet}
        bottomSheetContent={<AdminRightsBottomsheetContent />}
        bottomsheetContainerStyle={{ height: '93%' }}
      />
    </SafeAreaView>
  );
};

export default memo(Chatscreen);
