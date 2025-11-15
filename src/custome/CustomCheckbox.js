// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
// import { moderateScale, scale, verticalScale } from '../utils/Responsive';
// import Color from '../utils/Color';
// import { Fonts } from '../utils/Font';

// const CheckBox = ({
//   checkboxContainerStyle,
//   isChecked,
//   onPress,
//   title,
//   checkboxColor,
//   checkboxSize,
//   checkboxTitleStyle,
//   shape = 'square',
// }) => {
//   const circleIconName = isChecked
//     ? 'check-circle'
//     : 'checkbox-blank-circle-outline';
//   const squareIconName = isChecked
//     ? 'checkbox-marked'
//     : 'checkbox-blank-outline';

//   return (
//     <View style={[styles.container, checkboxContainerStyle]}>
//       <Pressable onPress={onPress}>
//         <MaterialDesignIcons
//           name={shape === 'circle' ? circleIconName : squareIconName}
//           size={checkboxSize ?? scale(24)}
//           color={isChecked ? checkboxColor ?? Color.Primary : Color.Gray}
//         />
//       </Pressable>
//       {title ? (
//         <Text style={[styles.title, checkboxTitleStyle]}>{title}</Text>
//       ) : null}
//     </View>
//   );
// };

// export default CheckBox;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: verticalScale(5),
//     marginHorizontal: scale(5),
//   },
//   title: {
//     fontSize: moderateScale(16),
//     color: Color.Black,
//     marginLeft: scale(10),
//     fontFamily: Fonts.interMedium,
//   },
// });

import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Color from '../utils/Color';
import { scale } from '../utils/Responsive';

const CheckBox = ({
  isChecked,
  onPress,
  size = scale(22),
  borderColor = Color.rgba.Gray[2],
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderColor: borderColor,
            borderRadius: size * 0.25, // gives that rounded-square look
            backgroundColor: isChecked ? Color.theme1 : Color.White,
            borderWidth: isChecked ? 0 : 1,
          },
        ]}
      >
        {isChecked && (
          <MaterialDesignIcons
            name="check"
            color={Color.White}
            size={size * 0.7}
          />
        )}
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
