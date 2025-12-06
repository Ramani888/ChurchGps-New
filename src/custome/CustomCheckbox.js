// // CheckBox.js
// import { Pressable, StyleSheet, View, Text } from 'react-native';
// import React from 'react';
// import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
// import Color from '../utils/Color';
// import { moderateScale, scale } from '../utils/Responsive';
// import { Fonts } from '../utils/Font';

// const CheckBox = ({
//   isChecked,
//   onPress,
//   size = scale(22),
//   borderColor = Color.rgba.Gray[2],
//   title,
//   orientation = 'horizontal',
//   containerStyle,
//   titleStyle,
//   disabled = false,
//   pressable = true,
// }) => {
//   const content = (
//     <View
//       style={[
//         styles.container,
//         { flexDirection: orientation === 'horizontal' ? 'row' : 'column' },
//         containerStyle,
//       ]}
//     >
//       <View
//         style={[
//           styles.box,
//           {
//             width: size,
//             height: size,
//             borderColor,
//             borderRadius: size * 0.25,
//             backgroundColor: isChecked ? Color.theme1 : Color.White,
//             borderWidth: isChecked ? 0 : 1,
//             opacity: disabled ? 0.5 : 1,
//           },
//         ]}
//       >
//         {isChecked && <MaterialDesignIcons name="check" color={Color.White} size={size * 0.7} />}
//       </View>

//       {title ? (
//         <Text
//           style={[
//             styles.title,
//             orientation === 'horizontal' ? { marginLeft: scale(8) } : { marginTop: scale(6) },
//             titleStyle,
//           ]}
//           numberOfLines={2}
//         >
//           {title}
//         </Text>
//       ) : null}
//     </View>
//   );

//   if (!pressable) {
//     return content; // <--- no inner Pressable, taps go to parent (Dropdown row)
//   }

//   return (
//     <Pressable onPress={disabled ? undefined : onPress} hitSlop={8}>
//       {content}
//     </Pressable>
//   );
// };

// export default CheckBox;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
//   box: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.interRegular,
//     color: Color.Black,
//   },
// });

// CheckBox.js
import { Pressable, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Color from '../utils/Color';
import { moderateScale, scale } from '../utils/Responsive';
import { Fonts } from '../utils/Font';

const CheckBox = ({
  isChecked,
  onPress,
  size = scale(22),
  borderColor = Color.rgba.Gray[2],
  title,
  orientation = 'horizontal',
  containerStyle,
  titleStyle,
  disabled = false,
  pressable = true,
  shape = 'square', // 🔥 "square" | "circle"
}) => {
  const radius = shape === 'circle' ? size / 2 : size * 0.25; // 🔥 circle logic added

  const content = (
    <View
      style={[
        styles.container,
        { flexDirection: orientation === 'horizontal' ? 'row' : 'column' },
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderRadius: radius, // 🔥 dynamic
            borderColor,
            backgroundColor: isChecked ? Color.theme1 : Color.White,
            borderWidth: isChecked ? 0 : shape === 'circle' ? 2.5 : 1,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {isChecked && <FontAwesome6 name="check" color={Color.White} size={size * 0.6} />}
      </View>

      {title ? (
        <Text
          style={[
            styles.title,
            orientation === 'horizontal' ? { marginLeft: scale(8) } : { marginTop: scale(6) },
            titleStyle,
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
      ) : null}
    </View>
  );

  if (!pressable) {
    return content;
  }

  return (
    <Pressable onPress={disabled ? undefined : onPress} hitSlop={8}>
      {content}
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
  },
});
