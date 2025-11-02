import { Image, Pressable, Text, View } from 'react-native';
import React, { memo, useCallback, useRef } from 'react';
import { styles } from './InfoScreenStyle';
import { screenName } from '../../../utils/NavigationKey';
import { useNavigation } from '@react-navigation/native';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import SwitchModeBottomsheetContent from '../../../components/bottomSheetContent/SwitchModeBottomsheetContent';
import { Images } from '../../../utils/Images';
import { scale } from '../../../utils/Responsive';

const InfoScreen = () => {
  const navigation = useNavigation();

  const SheetRef = useRef();

  const openSwitchModeSheet = useCallback(() => {
    SheetRef.current.show();
  }, []);

  const closeSwitchModeSheet = useCallback(() => {
    SheetRef.current.hide();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable
          style={styles.iconView}
          onPress={() => openSwitchModeSheet()}
        >
          <Image source={Images.switchIcon} style={styles.icon} />
        </Pressable>
        <Pressable
          style={[styles.iconView, { marginRight: scale(60) }]}
          onPress={() => navigation.navigate(screenName.map)}
        >
          <Image source={Images.infoIcon1} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.iconView}>
          <Image source={Images.switchIcon} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.iconView}>
          <Image source={Images.switchIcon} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.iconView}>
          <Image source={Images.switchIcon} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.iconView}>
          <Image source={Images.switchIcon} style={styles.icon} />
        </Pressable>
      </View>

      <CustomBottomsheet
        ref={SheetRef}
        onBottomsheetClose={closeSwitchModeSheet}
        bottomSheetContent={<SwitchModeBottomsheetContent />}
      />
    </View>
  );
};

export default memo(InfoScreen);
