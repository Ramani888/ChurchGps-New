import React, { forwardRef } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';
import { StyleSheet } from 'react-native';
import Color from '../utils/Color';

const CustomBottomsheet = forwardRef(function CustomBottomsheet(
  { children, radius = scale(36), gestureEnabled = true, isModal = true, height, setBlurVisible },
  ref,
) {
  return (
    <ActionSheet
      ref={ref}
      gestureEnabled={gestureEnabled}
      indicatorStyle={styles.indicator}
      containerStyle={{
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        ...(height ? { height } : {}),
      }}
      isModal={isModal}
      onOpen={() => {
        setTimeout(() => {
          setBlurVisible(true);
        }, 100);
      }}
      onClose={() => setBlurVisible(false)}
    >
      {children}
    </ActionSheet>
  );
});

export default CustomBottomsheet;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Color.Gray,
    width: moderateScale(60),
    marginTop: verticalScale(20),
  },
  actionSheetContainer: {},
});
