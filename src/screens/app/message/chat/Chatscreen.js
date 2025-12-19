import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './ChatscreenStyle';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { scale } from '../../../../utils/Responsive';
import Color from '../../../../utils/Color';
import { Images } from '../../../../utils/Images';

const Chatscreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { userName, image } = route.params ?? '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AntDesign name="left" size={scale(16)} color={Color.Black} />
        </Pressable>
        <Image source={{ uri: image }} style={styles.userImage} />
        <View>
          <Text style={styles.headerTitle}>{userName}</Text>
          <Text style={styles.memberLength}>8 Member</Text>
        </View>
        <View style={styles.headerIconView}>
          <TouchableOpacity>
            <Image source={Images.pinIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.calenderIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(Chatscreen);
