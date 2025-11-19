import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {
  selectFromCamera,
  selectFromGallery,
} from '../../utils/ReusableFunctions';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';

const ImagePickerBottomsheet = forwardRef(({ onImagePicked }, ref) => {
  const handleCamera = async () => {
    await selectFromCamera(onImagePicked);
    if (ref && ref.current) ref.current.hide();
  };

  const handleGallery = async () => {
    await selectFromGallery(onImagePicked);
    if (ref && ref.current) ref.current.hide();
  };

  return (
    <ActionSheet
      ref={ref}
      gestureEnabled
      containerStyle={styles.container}
      indicatorStyle={styles.indicator}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Select Image</Text>
        <Text style={styles.subtitle}>
          Choose how you want to add your profile / group picture.
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={handleCamera}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📷</Text>
            </View>
            <Text style={styles.cardTitle}>Camera</Text>
            <Text style={styles.cardSubtitle}>Take a new photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleGallery}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🖼️</Text>
            </View>
            <Text style={styles.cardTitle}>Gallery</Text>
            <Text style={styles.cardSubtitle}>Choose from library</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => ref && ref.current && ref.current.hide()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
});

export default ImagePickerBottomsheet;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    paddingBottom: verticalScale(24),
    backgroundColor: Color.White,
  },

  indicator: {
    width: scale(60),
    height: verticalScale(5),
    borderRadius: scale(3),
    backgroundColor: Color.Gray,
    marginTop: verticalScale(10),
  },

  content: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(8),
  },

  title: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.interBold,
    color: Color.Black,
    marginTop: verticalScale(8),
  },

  subtitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    marginTop: verticalScale(4),
  },

  row: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
  },

  card: {
    flex: 1,
    backgroundColor: Color.rgba.Gray[1],
    borderRadius: scale(18),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(4),
    alignItems: 'center',
  },

  iconCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.White,
    marginBottom: verticalScale(10),
  },

  iconText: {
    fontSize: moderateScale(22),
  },

  cardTitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },

  cardSubtitle: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.interRegular,
    color: Color.Gray,
    marginTop: verticalScale(2),
    textAlign: 'center',
  },

  cancelButton: {
    marginTop: verticalScale(20),
    height: verticalScale(44),
    borderRadius: scale(999),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.rgba.Gray[1],
  },

  cancelText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
});
