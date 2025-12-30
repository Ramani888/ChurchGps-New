import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';
import CustomInputField from '../../custome/CustomInputField';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

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

const ShowMessageFromBottomsheetContent = () => {
  const [search, setSearch] = useState('');

  const renderMembers = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.memberImage} />
        <View>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.userName}>{item?.userName}</Text>
        </View>
        <MaterialDesignIcons name="dots-vertical" size={scale(24)} color={Color.Black} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <GradientText
          text={strings.showMessageFrom}
          colors={Color.gradientColor1}
          style={styles.title}
        />
      </View>

      <View style={styles.devider} />

      <CustomInputField
        placeholder={strings.searchMember}
        onChangeText={setSearch}
        value={search}
        leftImage={Images.searchIcon1}
        inputWrapperStyle={styles.inputWrapperStyle}
      />

      <FlatList data={memberData} renderItem={renderMembers} />
    </SafeAreaView>
  );
};

export default memo(ShowMessageFromBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    padding: scale(22),
    paddingTop: verticalScale(-10),
  },
  headerView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
  },
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
});
