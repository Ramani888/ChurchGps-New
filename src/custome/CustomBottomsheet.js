import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import Color from '../utils/Color';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';

const CustomBottomsheet = ({
  ref,
  gestureEnabled,
  onBottomsheetClose,
  isModal = true,
  bottomsheetContainerStyle,
  bottomSheetContent,
}) => {
  return (
    <ActionSheet
      ref={ref}
      onClose={onBottomsheetClose}
      gestureEnabled={!gestureEnabled}
      indicatorStyle={styles.indicator}
      containerStyle={[styles.actionSheetContainer, bottomsheetContainerStyle]}
      isModal={isModal}
    >
      {bottomSheetContent}
    </ActionSheet>
  );
};

export default memo(CustomBottomsheet);

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Color.Gray,
    width: moderateScale(60),
    marginTop: verticalScale(20),
  },
  actionSheetContainer: {},
});
