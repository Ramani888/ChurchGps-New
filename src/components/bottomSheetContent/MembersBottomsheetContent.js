import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const MembersBottomsheetContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.emptyView} />
        <GradientText text={strings.members} colors={Color.gradientColor1} style={styles.title} />
        <Menu rendererProps={{ placement: 'auto' }}>
          <MenuTrigger>
            <Image source={Images.threedotCircleImage} style={styles.threeDotImage} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menuPopup,
            }}
          >
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={styles.menuText}>{strings.report}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </SafeAreaView>
  );
};

export default memo(MembersBottomsheetContent);

const styles = StyleSheet.create({
  container: { backgroundColor: Color.White, padding: scale(22), paddingTop: verticalScale(5) },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    justifyContent: 'space-between',
  },
  emptyView: { width: scale(24) },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
  },
  threeDotImage: {
    width: scale(24),
    height: scale(24),
  },
  menuPopup: {
    width: scale(160),
    padding: scale(16),
    marginTop: verticalScale(35),
    marginLeft: -verticalScale(8),
    borderRadius: scale(20),
    zIndex: 9999,
  },
  menuText: { fontSize: moderateScale(16), fontFamily: Fonts.interRegular },
});
