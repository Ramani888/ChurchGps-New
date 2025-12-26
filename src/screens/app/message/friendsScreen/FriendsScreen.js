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

const FriendsScreen = () => {
  const addFriendSheetRef = useRef();
  const createPollSheetRef = useRef();

  const [search, setSearch] = useState('');

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

  const closeAddFriendBottomsheet = useCallback(() => {
    addFriendSheetRef.current.hide();
  }, []);

  const openCreatePollBottomsheet = useCallback(() => {
    createPollSheetRef.current.show();
  }, []);

  const closeCreatePollBottomsheet = useCallback(() => {
    createPollSheetRef.current.hide();
  }, []);

  const renderFreinds = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.friendsImage} />
        <Text style={styles.title}>{item?.title}</Text>
        <TouchableOpacity onPress={() => openCreatePollBottomsheet()}>
          <Ionicons name="chatbubble-ellipses-outline" size={scale(24)} color={Color.Black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openAddFriendBottomsheet()}>
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
        searchIconPress={() => {}}
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

      <CustomBottomsheet
        ref={addFriendSheetRef}
        onBottomsheetClose={closeAddFriendBottomsheet}
        bottomSheetContent={<AddFriendBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={createPollSheetRef}
        gestureEnabled={true}
        onBottomsheetClose={closeCreatePollBottomsheet}
        bottomSheetContent={<CreatePollBottomsheetContent />}
        bottomsheetContainerStyle={{ height: '93%' }}
      />
    </SafeAreaView>
  );
};
export default memo(FriendsScreen);
