import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { verticalScale } from '../utils/Responsive';
import Color from '../utils/Color';

const CustomButton = ({
  buttonWidth,
  buttonHeight,
  backgroundColor,
  borderWidth,
  borderColor,
  borderRadius,
  justifyContent,
  alignItems,
  alignSelf,
  fontSize,
  fontFamily,
  fontColor,
  marginTop,
  marginBottom,
  marginVertical,
  marginLeft,
  marginRight,
  marginHorizontal,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  gap,
  position,
  top,
  bottom,
  left,
  right,
  title,
  leftIcon,
  rightIcon,
  onPress,
  disabled,
  android_ripple,
}) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        width: buttonWidth || '100%',
        height: buttonHeight || verticalScale(53),
        backgroundColor: backgroundColor || Color.theme1,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        justifyContent: justifyContent ? justifyContent : 'center',
        alignItems: alignItems ? alignItems : 'center',
        alignSelf: alignSelf ?? 'center',
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginVertical: marginVertical,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginHorizontal: marginHorizontal,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingHorizontal: paddingHorizontal,
        gap: gap,
        position: position,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      }}
      onPress={onPress}
      disabled={disabled}
      android_ripple={android_ripple}
    >
      {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

      <Text
        style={{ fontSize: fontSize, fontFamily: fontFamily, color: fontColor }}
      >
        {title}
      </Text>

      {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
    </Pressable>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({});
