import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, { memo } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';
import { Fonts } from '../utils/Font';
import Color from '../utils/Color';

const ICON_TOUCH_GAP = scale(8);
const ICON_SIZE = scale(20);
const INPUT_H = verticalScale(48);

const CustomInputField = ({
  label,
  labelStyle,
  placeholder,
  onChangeText,
  value,
  inputStyle,
  eyeIcon,
  setEye,
  eye,
  secureTextEntry,
  containerStyle,
  marginBottom,
  marginTop,
  editable,
  multiline,
  numberOfLines,
  maxLength,
  keyboardType,
  rightIcon,
  RightIconComponent,
  rightIconName,
  rightIconSize,
  rightIconColor,
  rightImage,
  rightImageStyle,
  leftIcon,
  LeftIconComponent,
  leftIconName,
  leftIconSize,
  leftIconColor,
  leftImage,
  leftImageStyle,
  errors,
  touched,
  errorViewStyle,
  errorTextStyle,
}) => {
  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={[
            styles.labelStyle,
            labelStyle,
            { marginBottom: marginBottom, marginTop: marginTop },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        {leftIcon && LeftIconComponent ? (
          <View style={styles.leftSlot}>
            <LeftIconComponent
              name={leftIconName}
              size={leftIconSize}
              color={leftIconColor}
            />
          </View>
        ) : null}

        {leftImage ? (
          <View style={styles.leftSlot}>
            <Image
              source={leftImage}
              style={[styles.iconImage, leftImageStyle]}
            />
          </View>
        ) : null}

        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={[
            styles.textInput,
            inputStyle,
            multiline && styles.textAreaInput,
            eyeIcon && { paddingRight: scale(40) },
          ]}
          keyboardType={keyboardType}
          placeholderTextColor={Color.Gray}
          accessible={true}
          accessibilityLabel={placeholder}
          editable={editable}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
        />
        <View style={styles.rightStack}>
          {rightIcon && RightIconComponent ? (
            <View style={styles.rightItem}>
              <RightIconComponent
                name={rightIconName}
                size={rightIconSize}
                color={rightIconColor}
              />
            </View>
          ) : null}

          {rightImage ? (
            <View style={styles.rightItem}>
              <Image
                source={rightImage}
                style={[styles.iconImage, rightImageStyle]}
              />
            </View>
          ) : null}
        </View>
        {eyeIcon && (
          <Pressable onPress={() => setEye(!eye)} style={styles.eyeIcon}>
            <Ionicons
              name={eye ? 'eye' : 'eye-off-sharp'}
              size={scale(20)}
              color={Color.Black}
            />
          </Pressable>
        )}
        {errors && touched && (
          <View style={[styles.viewError, errorViewStyle]}>
            <Text style={[styles.textError, errorTextStyle]}>{errors}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(CustomInputField);

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: scale(15),
    color: Color.Grey,
    marginBottom: verticalScale(5),
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    paddingHorizontal: scale(15),
    textAlignVertical: 'center',
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: verticalScale(130), // or adjust as needed
    paddingRight: scale(10),
  },
  // Left slot (absolute)
  leftSlot: {
    position: 'absolute',
    left: scale(12),
    height: INPUT_H,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Right visuals stack (absolute, row)
  rightStack: {
    position: 'absolute',
    right: scale(25),
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightItem: {
    marginLeft: ICON_TOUCH_GAP,
  },

  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(10),
    top: verticalScale(20),
  },
  viewError: {
    alignSelf: 'flex-start',
  },
  textError: {
    fontSize: moderateScale(10),
    color: Color.Red,
    fontFamily: Fonts.interRegular,
    paddingLeft: scale(5),
  },
});
