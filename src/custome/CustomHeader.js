import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale, verticalScale } from '../utils/Responsive';
import GradientText from '../components/GradientText';
import Color from '../utils/Color';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../utils/Font';

const CustomHeader = ({
  headerContainerStyle,
  backArrowVisible,
  firstLineTitle,
  gradientTitle,
  gradientTitleColor,
  titleFontSize,
  titleFontFamily,
  titleStyle,
  titleViewStyle,
  titleImageIcon,
  languageIcon,
  languageIconPress,
  editIcon,
  editIconPress,
  searchIcon,
  searchIconPress,
  infoIcon,
  infoIconPress,
  userPlusIcon,
  userPlusIconPress,
  userChatIcon,
  userChatIconPress,
  userRightIcon,
  userRightIconPress,
  rightIconContainerStyle,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, headerContainerStyle]}>
      {backArrowVisible && (
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AntDesign name="left" size={scale(16)} color={Color.Black} />
        </Pressable>
      )}

      <View style={[styles.titleView, titleViewStyle]}>
        {(gradientTitle || titleImageIcon) && (
          <>
            {firstLineTitle && (
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: titleFontSize ?? scale(32),
                    fontFamily: titleFontFamily ?? Fonts.spaceGroteskBold,
                    color: Color.Black,
                  },
                ]}
              >
                {firstLineTitle}
              </Text>
            )}
            {titleImageIcon ? (
              <View style={{ alignSelf: 'center' }}>
                <Image source={titleImageIcon} style={styles.titleImageIcon} />
              </View>
            ) : (
              <GradientText
                text={gradientTitle}
                colors={gradientTitleColor ? gradientTitleColor : Color.gradientColor1}
                style={[
                  styles.title,
                  {
                    titleStyle,
                    fontSize: titleFontSize ?? scale(32),
                    fontFamily: titleFontFamily ?? Fonts.spaceGroteskBold,
                    marginTop: firstLineTitle ? verticalScale(-10) : 0,
                  },
                ]}
              />
            )}
          </>
        )}
      </View>

      <View style={[styles.rightIconView, rightIconContainerStyle]}>
        {languageIcon && (
          <Pressable onPress={languageIconPress}>
            <Image source={languageIcon} style={styles.languageIcon} />
          </Pressable>
        )}
        {editIcon && (
          <Pressable onPress={editIconPress}>
            <Image source={editIcon} style={styles.icon} />
          </Pressable>
        )}
        {searchIcon && (
          <Pressable onPress={searchIconPress}>
            <Image source={searchIcon} style={styles.icon} />
          </Pressable>
        )}
        {infoIcon && (
          <Pressable onPress={infoIconPress}>
            <Image source={infoIcon} style={styles.infoIcon} />
          </Pressable>
        )}
        {userPlusIcon && (
          <Pressable onPress={userPlusIconPress}>
            <Image source={userPlusIcon} style={styles.icon} resizeMode="contain" />
          </Pressable>
        )}
        {userChatIcon && (
          <Pressable onPress={userChatIconPress}>
            <Image source={userChatIcon} style={styles.icon} resizeMode="contain" />
          </Pressable>
        )}
        {userRightIcon && (
          <Pressable onPress={userRightIconPress}>
            <Image source={userRightIcon} style={styles.icon} resizeMode="contain" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(60),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: { position: 'absolute', left: scale(15), zIndex: 10 },
  titleView: { position: 'absolute', left: 0, right: 0 },
  title: { textAlign: 'center', paddingBottom: verticalScale(3) },
  rightIconView: {
    position: 'absolute',
    right: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  languageIcon: { width: scale(30), height: scale(24) },
  icon: { width: scale(24), height: scale(24) },
  infoIcon: { width: scale(22.79), height: scale(22.79) },
  titleImageIcon: { width: scale(40), height: scale(40) },
});
