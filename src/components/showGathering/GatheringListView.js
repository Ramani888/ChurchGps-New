import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../custome/CustomButton';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import { useIsFocused } from '@react-navigation/native';

const GatheringListView = ({ showTopBtnView }) => {
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && <StatusBar backgroundColor={Color.Gray1} />}
      {showTopBtnView && (
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
              <Image source={Images.savedAllIcon} style={styles.checkIcon} />
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
              <Image source={Images.removedAllIcon} style={styles.checkIcon} />
            }
            gap={scale(5)}
            onPress={() => {}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GatheringListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Gray1,
    paddingHorizontal: scale(15),
  },
  topButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(70),
  },
  checkIcon: { width: scale(20), height: verticalScale(20) },
});
