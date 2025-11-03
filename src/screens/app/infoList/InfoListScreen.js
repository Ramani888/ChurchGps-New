import { Image, Pressable, Text, View } from 'react-native';
import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { styles } from './InfoListScreenStyle';
import { screenName } from '../../../utils/NavigationKey';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import SwitchModeBottomsheetContent from '../../../components/bottomSheetContent/SwitchModeBottomsheetContent';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomButton from '../../../custome/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { strings } from '../../../language/strings';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';

const IconComponent = ({ onPress, content, customStyle }) => {
  return (
    <Pressable style={[styles.iconView, customStyle]} onPress={onPress}>
      {content}
    </Pressable>
  );
};

const InfoListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const SheetRef = useRef();

  const [clickOnSavedIcon, setClickOnSavedIcon] = useState(false);

  const { saved } = route.params ?? false;

  useLayoutEffect(() => {
    setClickOnSavedIcon(saved);
  }, [route]);

  const openSwitchModeSheet = useCallback(() => {
    SheetRef.current.show();
  }, []);

  const closeSwitchModeSheet = useCallback(() => {
    SheetRef.current.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <IconComponent
          onPress={openSwitchModeSheet}
          content={<Image source={Images.switchIcon} style={styles.icon} />}
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.map)}
          content={<Image source={Images.infoIcon1} style={styles.icon} />}
          customStyle={{ marginRight: scale(60) }}
        />
        <IconComponent
          onPress={() => setClickOnSavedIcon(!clickOnSavedIcon)}
          content={<Image source={Images.savedIcon} style={styles.icon} />}
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.information)}
          content={
            <Image source={Images.informationIcon} style={styles.icon} />
          }
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.createGathering)}
          content={<Image source={Images.createIcon} style={styles.icon} />}
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.filter)}
          content={<Image source={Images.filterIcon} style={styles.icon} />}
        />
      </View>

      {clickOnSavedIcon && (
        <View style={styles.topButtonView}>
          <CustomButton
            title={strings.saved}
            buttonWidth={scale(159)}
            buttonHeight={verticalScale(36)}
            backgroundColor={Color.White}
            borderRadius={scale(30)}
            fontSize={moderateScale(14)}
            fontColor={Color.Black}
            fontFamily={Fonts.interMedium}
            marginTop={verticalScale(0)}
            marginBottom={verticalScale(20)}
            leftIcon={
              <Image source={Images.savedAllIcon} style={styles.savedIcon} />
            }
            gap={scale(5)}
            onPress={() => {}}
          />
          <CustomButton
            title={strings.removed}
            buttonWidth={scale(159)}
            buttonHeight={verticalScale(36)}
            backgroundColor={Color.White}
            borderRadius={scale(30)}
            fontSize={moderateScale(14)}
            fontColor={Color.Black}
            fontFamily={Fonts.interMedium}
            marginTop={verticalScale(0)}
            marginBottom={verticalScale(20)}
            leftIcon={
              <Image source={Images.removedAllIcon} style={styles.savedIcon} />
            }
            gap={scale(5)}
            onPress={() => {}}
          />
        </View>
      )}

      <CustomBottomsheet
        ref={SheetRef}
        onBottomsheetClose={closeSwitchModeSheet}
        bottomSheetContent={<SwitchModeBottomsheetContent />}
      />
    </SafeAreaView>
  );
};

export default memo(InfoListScreen);
