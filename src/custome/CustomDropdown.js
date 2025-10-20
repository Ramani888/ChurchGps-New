import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';
import Color from '../utils/Color';
import { Fonts } from '../utils/Font';

const CustomDropdown = ({
  data,
  renderItem,
  dropdownLabel,
  dropdownLabelStyle,
  dropdownContainerStyle,
  dropdownStyle,
  menuContainerStyle,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  iconStyle,
  dropdownPlaceholder,
  search,
  searchPlaceholder,
  searchPlaceholderTextColor,
  value,
  setValue,
  maxHeight,
  leftIcon,
  rightIcon,
  dropdownListItemContainerStyle,
  dropdownListItemTextStyle,
  selectedTextBackgroundColor,
  disable,
  dropdownPosition,
  autoScrollToselectedItem,
  flatListProps,
  iconColor,
  touched,
  errors,
  errorViewStyle,
  errorTextStyle,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            dropdownLabelStyle,
            isFocus && { color: 'blue' },
          ]}
        >
          {dropdownLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, dropdownContainerStyle]}>
      {dropdownLabel && renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          dropdownStyle,
          isFocus && { borderColor: 'blue' },
        ]}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? dropdownPlaceholder : '...'}
        data={data}
        renderItem={renderItem}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        value={value}
        search={search}
        searchPlaceholder={searchPlaceholder || 'Search...'}
        searchPlaceholderTextColor={searchPlaceholderTextColor || Color.Gray}
        maxHeight={maxHeight}
        disable={disable || false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderLeftIcon={leftIcon}
        renderRightIcon={rightIcon}
        iconColor={iconColor || Color.Black}
        activeColor={selectedTextBackgroundColor || Color.transparent}
        dropdownPosition={dropdownPosition}
        autoScroll={autoScrollToselectedItem || true}
        showsVerticalScrollIndicator={false}
        flatListProps={flatListProps}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
        containerStyle={[styles.menuContainer, menuContainerStyle]}
        itemContainerStyle={
          dropdownListItemContainerStyle || { borderRadius: scale(16) }
        }
        itemTextStyle={dropdownListItemTextStyle}
        iconStyle={[styles.iconStyle, iconStyle]}
      />
      {errors && touched && (
        <View style={[styles.viewError, errorViewStyle]}>
          <Text style={[styles.textError, errorTextStyle]}>{errors}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(CustomDropdown);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
  },
  menuContainer: {
    borderRadius: scale(16),
    padding: scale(10),
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
