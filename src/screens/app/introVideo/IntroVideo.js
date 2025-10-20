import { View, Text, Image, Pressable } from 'react-native';
import React, { memo } from 'react';
import { strings } from '../../../language/strings';
import CustomHeader from '../../../custome/CustomHeader';
import { scale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';
import { styles } from './IntroVideoStyle';
import { Images } from '../../../utils/Images';
import { Shadow } from 'react-native-shadow-2';
import Ionicons from '@react-native-vector-icons/ionicons';
import Color from '../../../utils/Color';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroVideo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible={true}
        gradientTitle={strings.introVideo}
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
      />

      <View style={styles.videoView}>
        <Image source={Images.profileImageIcon1} style={styles.profileImage} />
      </View>

      <Shadow
        style={styles.buttonView}
        distance={10}
        startColor={'rgba(0, 0, 0, 0.025)'}
      >
        <View style={styles.columnView}>
          <Pressable
            style={[styles.iconView, { backgroundColor: Color.Pink }]}
            onPress={() => navigation.navigate(screenName.recordVideo)}
          >
            <Ionicons name={'square'} size={scale(18)} color={Color.White} />
          </Pressable>
          <Text style={styles.btnText}>{strings.recordNew}</Text>
        </View>
      </Shadow>

      <Text style={styles.infoText}>{strings.introVideoInfotext}</Text>
    </SafeAreaView>
  );
};

export default memo(IntroVideo);
