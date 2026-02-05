import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './UserScreenStyle';
import CustomHeader from '../../../../custome/CustomHeader';
import { strings } from '../../../../language/strings';
import { Images } from '../../../../utils/Images';
import Color from '../../../../utils/Color';
import { scale } from '../../../../utils/Responsive';
import { screenName } from '../../../../utils/NavigationKey';
import CustomBottomsheet from '../../../../custome/CustomBottomsheet';
import ShowMessageFromBottomsheetContent from '../../../../components/bottomSheetContent/ShowMessageFromBottomsheetContent';
import StartVoiceChatBottomsheetContent from '../../../../components/bottomSheetContent/StartVoiceChatBottomsheetContent';
import EndVoiceChatBottomsheetContent from '../../../../components/bottomSheetContent/EndVoiceChatBottomsheetContent';
import { BlurView } from '@react-native-community/blur';
import DBRBottomsheetContent from '../../../../components/bottomSheetContent/DBRBottomsheetContent';
import DeleteBottomsheetContent from '../../../../components/bottomSheetContent/DeleteBottomsheetContent';
import ReportBottomsheetContent from '../../../../components/bottomSheetContent/ReportBottomsheetContent';
import BlockBottomsheetContent from '../../../../components/bottomSheetContent/BlockBottomsheetContent';

const USER_DATA = [
  {
    id: '1',
    image:
      'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
    title: 'jims Church',
    message: 'Hi, please verify sign in with this code',
  },
  {
    id: '2',
    image: USER_DATA_PLACEHOLDER(),
    title: 'jims Church',
    message: 'Hi, please verify sign in with this code',
  },
  {
    id: '3',
    image: USER_DATA_PLACEHOLDER(),
    title: 'jims Church',
    message: 'Hi, please verify sign in with this code',
  },
  {
    id: '4',
    image: USER_DATA_PLACEHOLDER(),
    title: 'jims Church',
    message: 'Hi, please verify sign in with this code',
  },
  {
    id: '5',
    image: USER_DATA_PLACEHOLDER(),
    title: 'jims Church',
    message: 'Hi, please verify sign in with this code',
  },
];

function USER_DATA_PLACEHOLDER() {
  return 'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg';
}

const TabButton = memo(function TabButton({ image, onPress }) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress} hitSlop={10}>
      <Image source={image} style={styles.tabImages} />
    </Pressable>
  );
});

const UserRow = memo(function UserRow({ item, onRowPress, onMenuPress }) {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.75}
      onPress={() => onRowPress(item)}
    >
      <Image source={{ uri: item?.image }} style={styles.userImage} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {item?.title}
        </Text>
        <Text style={styles.message} numberOfLines={1}>
          {item?.message}
        </Text>
      </View>

      <Pressable
        hitSlop={12}
        onPress={e => {
          e?.stopPropagation?.();
          onMenuPress(item);
        }}
      >
        <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
      </Pressable>
    </TouchableOpacity>
  );
});

const MessageScreen = () => {
  const navigation = useNavigation();
  const showMessageFromSheetRef = useRef();
  const endVoiceChatSheetRef = useRef();
  const DBRSheetRef = useRef();
  const deleteSheetRef = useRef();
  const blockSheetRef = useRef();
  const reportSheetRef = useRef();

  const [blurVisible, setBlurVisible] = useState(false);

  const userData = useMemo(() => USER_DATA, []);

  const openShowMessageFromBottomsheet = useCallback(() => {
    showMessageFromSheetRef.current.show();
  }, []);

  // const openStartVoiceChatBottomsheet = useCallback(() => {
  //   startVoiceChatSheetRef.current.show();
  // }, []);

  // const openEndVoiceChatBottomsheet = useCallback(() => {
  //   endVoiceChatSheetRef.current.show();
  // }, []);

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

  const onRowPress = useCallback(
    item => {
      navigation.navigate(screenName.chatScreen, {
        userName: item?.title ?? '',
        image: item?.image ?? '',
      });
    },
    [navigation],
  );

  const onMenuPress = useCallback(item => {
    console.log('Menu pressed for:', item?.id, item?.title);
    openDBRBottomsheet();
  }, []);

  const renderItem = useCallback(
    ({ item }) => <UserRow item={item} onRowPress={onRowPress} onMenuPress={onMenuPress} />,
    [onRowPress, onMenuPress],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback((_, index) => {
    const ITEM_HEIGHT = scale(70);
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader gradientTitle={strings.chat} />

      <View style={styles.bodyContainer}>
        <View style={styles.tabView}>
          <TabButton
            image={Images.chatLocationIcon}
            onPress={() => openShowMessageFromBottomsheet()}
          />
          <TabButton
            image={Images.chatNotificationIcon}
            onPress={() => navigation.navigate(screenName.calenderScreen)}
          />
          <TabButton
            image={Images.chatMultiuserIcon}
            onPress={() => navigation.navigate(screenName.friendsScreen)}
          />
        </View>

        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.flatlist}
          removeClippedSubviews
          initialNumToRender={10}
          windowSize={7}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          getItemLayout={getItemLayout}
        />
      </View>

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={showMessageFromSheetRef} setBlurVisible={setBlurVisible}>
        <ShowMessageFromBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={endVoiceChatSheetRef} setBlurVisible={setBlurVisible}>
        <EndVoiceChatBottomsheetContent />
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

export default memo(MessageScreen);
