import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale, verticalScale } from '../utils/Responsive';
import GradientText from '../components/GradientText';
import Color from '../utils/Color';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../utils/Font';

const CustomHeader = ({
  backArrowVisible,
  gradientTitle,
  gradientTitleColor,
  titleFontSize,
  titleFontFamily,
  titleStyle,
  languageIcon,
  languageIconPress,
  editIcon,
  editIconPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {backArrowVisible && (
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AntDesign name="left" size={scale(16)} color={Color.Black} />
        </Pressable>
      )}

      <View style={styles.titleView}>
        {gradientTitle && (
          <GradientText
            text={gradientTitle}
            colors={
              gradientTitleColor ? gradientTitleColor : Color.gradientColor1
            }
            style={[
              styles.title,
              {
                titleStyle,
                fontSize: titleFontSize ?? scale(32),
                fontFamily: titleFontFamily ?? Fonts.spaceGroteskBold,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.rightIconView}>
        {languageIcon && (
          <Pressable onPress={languageIconPress}>
            <Image source={languageIcon} style={styles.languageIcon} />
          </Pressable>
        )}
        {editIcon && (
          <Pressable onPress={editIconPress}>
            <Image source={editIcon} style={styles.editIcon} />
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
    right: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  languageIcon: { width: scale(30), height: scale(24) },
  editIcon: { width: scale(24), height: scale(24) },
});
