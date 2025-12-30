import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlatformPressable } from '@react-navigation/elements';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';
import Color from '../utils/Color';
import { Images } from '../utils/Images';

const BASE_PADDING = verticalScale(8);

const CustomBottomTab = memo(({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, BASE_PADDING);

  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={[styles.wrapper, { paddingBottom: bottomPad }]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.jumpTo(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          const icon = getTabIcon(route.name);
          const darkIcon = getDarkTabIcon(route.name);

          return (
            <PlatformPressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.itemPressable}
              hitSlop={10}
            >
              <View
                style={[
                  styles.tile,
                  {
                    backgroundColor: isFocused ? Color.rgba.theme1[2] : Color.White,
                  },
                ]}
              >
                <Image
                  source={isFocused ? darkIcon : icon}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <View style={[styles.focusPill, { opacity: isFocused ? 1 : 0 }]} />
              </View>
            </PlatformPressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
});

const getTabIcon = name => {
  switch (name) {
    case 'User':
      return Images.chatIcon;
    case 'Map':
      return Images.searchIcon;
    case 'CommunityBoard':
      return Images.gridcon;
    case 'Profile':
      return Images.profileIcon;
    default:
      return Images.profileIcon;
  }
};

const getDarkTabIcon = name => {
  switch (name) {
    case 'User':
      return Images.darkChatIcon;
    case 'Map':
      return Images.darkSearchIcon;
    case 'CommunityBoard':
      return Images.darkGridcon;
    case 'Profile':
      return Images.darkProfileIcon;
    default:
      return Images.darkProfileIcon;
  }
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: Color.White,
    height: verticalScale(80),
  },
  bar: {
    flexDirection: 'row',
    margin: moderateScale(5),
  },
  itemPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderRadius: scale(46),
    width: scale(87),
    height: scale(56),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(-25),
  },
  icon: {
    width: scale(32),
    height: scale(32),
  },
});
