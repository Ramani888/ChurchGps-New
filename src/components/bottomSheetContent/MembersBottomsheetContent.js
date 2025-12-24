import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import CustomInputField from '../../custome/CustomInputField';
import CustomButton from '../../custome/CustomButton';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import CustomBottomsheet from '../../custome/CustomBottomsheet';
import BanBottomsheetContent from './BanBottomsheetContent';

const memberData = [
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    name: 'siti',
    userName: '@siti',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
];

const MembersBottomsheetContent = ({
  closeMembersBottomsheet,
  openBanBottomsheet,
  openAdminRightsBottomsheet,
  openMemberPermissionBottomsheet,
}) => {
  const [memberName, setMemberName] = useState('');

  const renderMembers = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.memberImage} />
        <View>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.userName}>{item?.userName}</Text>
        </View>
        <Menu rendererProps={{ placement: 'auto' }}>
          <MenuTrigger>
            <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menuPopup1,
            }}
          >
            <MenuOption
              onSelect={() => {
                openBanBottomsheet();
                closeMembersBottomsheet();
              }}
            >
              <Text style={styles.menuText}>{strings.ban}</Text>
            </MenuOption>
            <View style={styles.menuDevider} />
            <MenuOption onSelect={() => {}}>
              <Text style={styles.menuText}>{strings.promote}</Text>
            </MenuOption>
            <View style={styles.menuDevider} />
            <MenuOption onSelect={() => {}}>
              <Text style={styles.menuText}>{strings.mute}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.emptyView} />
        <GradientText text={strings.members} colors={Color.gradientColor1} style={styles.title} />
        <Menu rendererProps={{ placement: 'auto' }}>
          <MenuTrigger>
            <Image
              source={Images.threedotCircleImage}
              style={[styles.threeDotImage, { marginTop: verticalScale(8) }]}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menuPopup,
            }}
          >
            <MenuOption onSelect={() => {}}>
              <Text style={styles.menuText}>{strings.actionHistory}</Text>
            </MenuOption>
            <View style={[styles.menuDevider, { width: scale(166) }]} />
            <MenuOption
              onSelect={() => {
                closeMembersBottomsheet();
                openMemberPermissionBottomsheet();
              }}
            >
              <Text style={styles.menuText}>{strings.memberPermission}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <View style={styles.devider} />

      <CustomInputField
        placeholder={strings.searchMember}
        onChangeText={setMemberName}
        value={memberName}
        leftImage={Images.searchIcon1}
        inputWrapperStyle={styles.inputWrapperStyle}
      />

      <View style={styles.btnView}>
        <CustomButton
          title={strings.admins}
          buttonHeight={verticalScale(34)}
          buttonWidth={scale(92)}
          backgroundColor={Color.theme1}
          borderRadius={scale(26)}
          fontSize={moderateScale(12)}
          fontColor={Color.Black}
          fontFamily={Fonts.interMedium}
          onPress={() => {
            closeMembersBottomsheet();
            openAdminRightsBottomsheet();
          }}
        />
        <CustomButton
          title={strings.banned}
          buttonHeight={verticalScale(34)}
          buttonWidth={scale(92)}
          backgroundColor={Color.theme1}
          borderRadius={scale(26)}
          fontSize={moderateScale(12)}
          fontColor={Color.Black}
          fontFamily={Fonts.interMedium}
          onPress={() => {}}
        />
      </View>

      <FlatList data={memberData} renderItem={renderMembers} />
    </SafeAreaView>
  );
};

export default memo(MembersBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    padding: scale(22),
    paddingTop: verticalScale(-10),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: scale(198),
    padding: scale(16),
    marginTop: verticalScale(35),
    borderRadius: scale(20),
  },
  menuText: { fontSize: moderateScale(16), fontFamily: Fonts.interRegular },
  devider: {
    width: scale(331),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginVertical: verticalScale(15),
  },
  inputWrapperStyle: {
    backgroundColor: Color.rgba.Gray[1],
    width: scale(331),
    height: verticalScale(44),
    alignSelf: 'center',
    borderRadius: scale(16),
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(5),
    marginTop: verticalScale(5),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
    marginTop: verticalScale(18),
  },
  memberImage: { width: scale(40), height: scale(40), borderRadius: scale(20) },
  name: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    width: scale(243),
  },
  userName: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    marginTop: verticalScale(-3),
    width: scale(243),
  },
  menuPopup1: {
    width: scale(160),
    padding: scale(16),
    marginTop: verticalScale(25),
    borderRadius: scale(20),
    marginLeft: scale(-8),
  },
  menuDevider: {
    width: scale(128),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[1],
    marginVertical: verticalScale(2),
  },
});
