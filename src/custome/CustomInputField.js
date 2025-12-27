import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
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
  inputWrapperStyle,
  marginBottom,
  marginTop,
  editable,
  multiline,
  numberOfLines,
  textAreaHeight,
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
    <View style={[containerStyle, { marginBottom: verticalScale(7) }]}>
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

      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        {leftIcon && LeftIconComponent ? (
          <LeftIconComponent name={leftIconName} size={leftIconSize} color={leftIconColor} />
        ) : null}

        {leftImage ? <Image source={leftImage} style={[styles.iconImage, leftImageStyle]} /> : null}

        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={[
            styles.textInput,
            inputStyle,
            multiline && styles.textAreaInput,
            textAreaHeight && { height: textAreaHeight },
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
            <RightIconComponent name={rightIconName} size={rightIconSize} color={rightIconColor} />
          ) : null}

          {rightImage ? (
            <Image source={rightImage} style={[styles.iconImage, rightImageStyle]} />
          ) : null}
        </View>
        {eyeIcon && (
          <Pressable onPress={() => setEye(!eye)} style={styles.eyeIcon}>
            <Ionicons name={eye ? 'eye' : 'eye-off-sharp'} size={scale(20)} color={Color.Black} />
          </Pressable>
        )}
      </View>
      {errors && touched && (
        <View style={[styles.viewError, errorViewStyle]}>
          <Text style={[styles.textError, errorTextStyle]}>{errors}</Text>
        </View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: Color.Black,
    fontFamily: Fonts.interRegular,
    paddingHorizontal: scale(15),
    textAlignVertical: 'center',
    width: '100%',
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: verticalScale(130), // or adjust as needed
    paddingRight: scale(10),
  },
  // Left slot (absolute)
  leftSlot: {
    // position: 'rela',
    // left: scale(12),
    // height: INPUT_H,
    // justifyContent: 'center',
    // alignItems: 'center',
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
