import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MemberProfileScreenStyle';
import CustomHeader from '../../../../custome/CustomHeader';
import { Images } from '../../../../utils/Images';

const MemberProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible={true} />

      <View>
        <View style={styles.profileImageView}>
          <Image source={Images.profileImageIcon} style={styles.profileImage} />
          <Text style={styles.profileName}>Alfrado Bator</Text>
          <Text style={styles.userName}>@alfrado</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(MemberProfileScreen);
