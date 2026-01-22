import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { styles } from './FriendsScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../../custome/CustomHeader';
import { strings } from '../../../../language/strings';
import { Images } from '../../../../utils/Images';
import Color from '../../../../utils/Color';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { scale } from '../../../../utils/Responsive';
import CustomBottomsheet from '../../../../custome/CustomBottomsheet';
import AddFriendBottomsheetContent from '../../../../components/bottomSheetContent/AddFriendBottomsheetContent';
import CreatePollBottomsheetContent from '../../../../components/bottomSheetContent/CreatePollBottomsheetContent';
import VoiceChatPermissionBottomsheetContent from '../../../../components/bottomSheetContent/VoiceChatPermissionBottomsheetContent';
import { BlurView } from '@react-native-community/blur';
import DBRBottomsheetContent from '../../../../components/bottomSheetContent/DBRBottomsheetContent';
import DeleteBottomsheetContent from '../../../../components/bottomSheetContent/DeleteBottomsheetContent';
import BlockBottomsheetContent from '../../../../components/bottomSheetContent/BlockBottomsheetContent';
import ReportBottomsheetContent from '../../../../components/bottomSheetContent/ReportBottomsheetContent';

const FriendsScreen = () => {
  const addFriendSheetRef = useRef();
  const createPollSheetRef = useRef();
  const voiceChatPermissionSheetRef = useRef();
  const DBRSheetRef = useRef();
  const deleteSheetRef = useRef();
  const blockSheetRef = useRef();
  const reportSheetRef = useRef();

  const [search, setSearch] = useState('');
  const [blurVisible, setBlurVisible] = useState(false);

  const friendsData = [
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'Omar',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'Omar',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'Omar',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'Omar',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'Omar',
    },
  ];

  const openAddFriendBottomsheet = useCallback(() => {
    addFriendSheetRef.current.show();
  }, []);

  const openCreatePollBottomsheet = useCallback(() => {
    createPollSheetRef.current.show();
  }, []);

  const openVoiceChatPermissionBottomsheet = useCallback(() => {
    voiceChatPermissionSheetRef.current.show();
  }, []);

  const openDBRBottomsheet = useCallback(() => {
    DBRSheetRef.current.show();
  }, []);

  const closeDBRBottomsheet = useCallback(() => {
    DBRSheetRef.current.hide();
  }, []);

  const openDeleteBottomsheet = useCallback(() => {
    deleteSheetRef.current.show();
  }, []);

  const openBlockBottomsheet = useCallback(() => {
    blockSheetRef.current.show();
  }, []);

  const openReportBottomsheet = useCallback(() => {
    reportSheetRef.current.show();
  }, []);

  const renderFreinds = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.friendsImage} />
        <Text style={styles.title}>{item?.title}</Text>
        <TouchableOpacity onPress={() => openCreatePollBottomsheet()}>
          <Ionicons name="chatbubble-ellipses-outline" size={scale(24)} color={Color.Black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDBRBottomsheet()}>
          <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        gradientTitle={strings.friends}
        searchIcon={Images.searchIcon1}
        searchIconPress={() => openVoiceChatPermissionBottomsheet()}
      />

      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={Images.searchIcon1}
            style={styles.searchIcon}
            tintColor={Color.rgba.Black[4]}
          />
          <TextInput
            placeholder={strings.enterUsernameOrRefferal}
            placeholderTextColor={Color.rgba.Black[4]}
            onChangeText={setSearch}
            value={search}
            style={styles.inputStyle}
          />
        </View>

        <FlatList data={friendsData} renderItem={renderFreinds} style={styles.flatlist} />
      </View>

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={addFriendSheetRef} setBlurVisible={setBlurVisible}>
        <AddFriendBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet
        ref={createPollSheetRef}
        gestureEnabled={false}
        height={'93%'}
        setBlurVisible={setBlurVisible}
      >
        <CreatePollBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet
        ref={voiceChatPermissionSheetRef}
        isModal={false}
        setBlurVisible={setBlurVisible}
      >
        <VoiceChatPermissionBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={DBRSheetRef} setBlurVisible={setBlurVisible}>
        <DBRBottomsheetContent
          closeDBRBottomsheet={closeDBRBottomsheet}
          openDeleteBottomsheet={openDeleteBottomsheet}
          openReportBottomsheet={openReportBottomsheet}
          openBlockBottomsheet={openBlockBottomsheet}
        />
      </CustomBottomsheet>

      <CustomBottomsheet ref={deleteSheetRef} setBlurVisible={setBlurVisible}>
        <DeleteBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={blockSheetRef} setBlurVisible={setBlurVisible}>
        <BlockBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={reportSheetRef} setBlurVisible={setBlurVisible}>
        <ReportBottomsheetContent />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};
export default memo(FriendsScreen);
