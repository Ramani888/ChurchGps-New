import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import CustomButton from '../../custome/CustomButton';

const CancelSubscriptionBottomsheetContent = () => {
  const listData = [
    { info: strings.cancelSubscriptionText1 },
    { info: strings.cancelSubscriptionText2 },
    { info: strings.cancelSubscriptionText3 },
  ];

  const renderInfo = useCallback(({ item }) => {
    return (
      <View style={styles.infoView}>
        <Image source={Images.rightIcon} style={styles.rightTickicon} />
        <Text style={styles.infoText}>{item?.info}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.bottomsheetView}>
      <GradientText
        text={strings.subscription}
        colors={Color.gradientColor1}
        style={styles.subscriptionHeading}
      />
      <View style={styles.devider} />

      <FlatList data={listData} renderItem={renderInfo} />
      <Text style={styles.autoRenewText}>{strings.autoRenewInfo}</Text>

      <CustomButton
        title={strings.cancelSubscription}
        backgroundColor={Color.theme2}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.White}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(15)}
        marginBottom={verticalScale(15)}
        onPress={() => {}}
      />
    </View>
  );
};

export default CancelSubscriptionBottomsheetContent;

const styles = StyleSheet.create({
  bottomsheetView: { padding: scale(10) },
  subscriptionHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
  },
  devider: {
    borderBottomWidth: scale(1),
    width: scale(331),
    borderColor: Color.rgba.Gray[2],
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(10),
    marginBottom: verticalScale(10),
    marginLeft: scale(5),
  },
  rightTickicon: { width: scale(24), height: scale(24) },
  infoText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interMedium,
    lineHeight: verticalScale(24),
    color: Color.Black,
    width: '90%',
  },
  autoRenewText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.interRegular,
    lineHeight: verticalScale(18),
    color: Color.Gray,
    textAlign: 'center',
  },
});
