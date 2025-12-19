import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './UserScreenStyle';
import CustomHeader from '../../../../custome/CustomHeader';
import { strings } from '../../../../language/strings';
import { Images } from '../../../../utils/Images';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Color from '../../../../utils/Color';
import { scale } from '../../../../utils/Responsive';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../../utils/NavigationKey';

const TabButton = ({ image }) => {
  return (
    <TouchableOpacity style={styles.tabButton}>
      <Image source={image} style={styles.tabImages} />
    </TouchableOpacity>
  );
};

const MessageScreen = () => {
  const navigation = useNavigation();

  const userData = [
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'jims Church',
      message: 'Hi, please verify sign in with this code',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'jims Church',
      message: 'Hi, please verify sign in with this code',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'jims Church',
      message: 'Hi, please verify sign in with this code',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'jims Church',
      message: 'Hi, please verify sign in with this code',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg',
      title: 'jims Church',
      message: 'Hi, please verify sign in with this code',
    },
  ];

  const renderUser = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate(screenName.chatScreen, { userName: item?.title, image: item?.image })
        }
      >
        <Image source={{ uri: item?.image }} style={styles.userImage} />
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.message}>{item?.message}</Text>
        </View>
        <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible gradientTitle={strings.chat} />

      <View style={styles.bodyContainer}>
        <View style={styles.tabView}>
          <TabButton image={Images.chatLocationIcon} />
          <TabButton image={Images.chatNotificationIcon} />
          <TabButton image={Images.chatMultiuserIcon} />
        </View>

        <FlatList data={userData} renderItem={renderUser} style={styles.flatlist} />
      </View>
    </SafeAreaView>
  );
};

export default memo(MessageScreen);
