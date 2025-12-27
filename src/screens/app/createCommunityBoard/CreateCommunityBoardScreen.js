import { View, Text } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateCommunityBoardStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomInputField from '../../../custome/CustomInputField';
import CustomButton from '../../../custome/CustomButton';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';
import Entypo from '@react-native-vector-icons/entypo';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import AddGroupBottomsheetContent from '../../../components/bottomSheetContent/AddGroupBottomsheetContent';
import { BlurView } from '@react-native-community/blur';

const CreateCommunityBoardScreen = () => {
  const sheetRef = useRef();

  const [description, setDescription] = useState('');
  const [blurVisible, setBlurVisible] = useState(false);

  const openBottomsheet = useCallback(() => {
    sheetRef.current.show();
  }, []);

  const closeBottomsheet = useCallback(() => {
    sheetRef.current.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        firstLineTitle={strings.create}
        gradientTitle={strings.communityBoard}
        infoIcon={Images.infoIcon}
        titleViewStyle={{ marginTop: verticalScale(55) }}
        infoIconPress={() => {}}
      />

      <View style={styles.bodyContaier}>
        <CustomInputField
          label={strings.description}
          labelStyle={styles.headingStyle}
          placeholder={strings.enterDescription}
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={4}
          inputStyle={styles.inputStyle}
        />

        <CustomButton
          title={strings.addGroup}
          backgroundColor={Color.theme2}
          buttonHeight={verticalScale(54)}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.White}
          fontFamily={Fonts.sfProBold}
          rightIcon={
            <Entypo name="plus" size={scale(19)} color={Color.Black} style={styles.plusIcon} />
          }
          onPress={openBottomsheet}
          marginVertical={verticalScale(10)}
        />

        <CustomButton
          title={strings.create}
          backgroundColor={Color.theme1}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.Black}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(15)}
          marginBottom={verticalScale(20)}
          onPress={() => {}}
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

      <CustomBottomsheet ref={sheetRef} setBlurVisible={setBlurVisible}>
        <AddGroupBottomsheetContent />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

export default memo(CreateCommunityBoardScreen);
