import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';
import Color from '../utils/Color';
import { Fonts } from '../utils/Font';

const CustomTabView = ({
  tabs = [], // [{ key, title, component }]
  initialIndex = 0,
  swipeEnabled = false,
  tabBar = {},
  tabMinheight,
  onTabChange,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(initialIndex);
  const [trackWidth, setTrackWidth] = useState(0);

  const {
    height = verticalScale(44),
    backgroundColor = 'transparent',
    borderRadius,
    indicatorPillRadius,
    containerStyle,
    paddingHorizontal = scale(10),
    gap = scale(12),

    activeColor = Color.Black,
    inactiveColor = Color.Gray,
    activeFontFamily = Fonts.interSemiBold,
    inactiveFontFamily = Fonts.interRegular,

    indicatorColor = Color.theme1,
    indicatorHeight = verticalScale(36),
    indicatorWidth, // <- optional fixed width for pill

    tabStyle,
    labelStyle,
  } = tabBar || {};

  /* Routes + scenes */
  const routes = useMemo(
    () => tabs.map(t => ({ key: t.key, title: t.title })),
    [tabs],
  );

  const handleIndexChange = useCallback(
    i => {
      setIndex(i);
      const r = routes[i];
      onTabChange?.(r.key, r.title, i);
    },
    [routes, onTabChange],
  );

  const renderScene = useMemo(() => {
    const scenes = {};
    tabs.forEach(t => (scenes[t.key] = t.component));
    return SceneMap(scenes);
  }, [tabs]);

  /* Tab metrics (equal widths) */
  const computeTabMetrics = useCallback(() => {
    const count = Math.max(tabs.length, 1);
    const innerWidth = Math.max(trackWidth - paddingHorizontal * 2, 0);
    const totalGaps = Math.max((count - 1) * gap, 0);
    const tabW = count > 0 ? (innerWidth - totalGaps) / count : 0;
    return { count, tabW, innerWidth };
  }, [tabs.length, trackWidth, paddingHorizontal, gap]);

  return (
    <TabView
      style={{ minHeight: tabMinheight }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      swipeEnabled={swipeEnabled}
      renderTabBar={({ navigationState, jumpTo, position }) => {
        const { count, tabW } = computeTabMetrics();

        // Pill width: custom or tab width
        const pillW =
          typeof indicatorWidth === 'number' && indicatorWidth > 0
            ? indicatorWidth
            : Math.max(tabW, 0);

        // TranslateX: start at left padding, step per tab, center pill within tab
        const inputRange = Array.from({ length: count }, (_, i) => i);
        const outputRange = inputRange.map(
          i => paddingHorizontal + i * (tabW + gap) + (tabW - pillW) / 2,
        );
        const translateX = position.interpolate({ inputRange, outputRange });

        return (
          <View style={[styles.wrapper, { backgroundColor }]}>
            <View
              onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}
              style={[
                styles.track,
                { height, borderRadius, backgroundColor: '#ECECEC' },
                containerStyle,
              ]}
            >
              {/* Indicator pill */}
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.indicator,
                  {
                    height: indicatorHeight,
                    width: pillW,
                    backgroundColor: indicatorColor,
                    borderRadius: indicatorPillRadius ?? indicatorHeight / 2,
                    transform: [{ translateX }],
                    top: (height - indicatorHeight) / 2,
                  },
                ]}
              />

              {/* Tabs */}
              <View
                style={[
                  styles.row,
                  {
                    paddingHorizontal,
                    gap,
                    height,
                  },
                ]}
              >
                {navigationState.routes.map((route, i) => {
                  const isActive = navigationState.index === i;
                  return (
                    <Pressable
                      key={route.key}
                      accessibilityRole="button"
                      onPress={() => jumpTo(route.key)}
                      style={[
                        styles.tab,
                        {
                          width: Math.max(tabW, 0),
                          height: indicatorHeight,
                          borderRadius: indicatorHeight / 2,
                          backgroundColor: 'transparent',
                        },
                        tabStyle,
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.label,
                          {
                            color: isActive ? activeColor : inactiveColor,
                            fontFamily: isActive
                              ? activeFontFamily
                              : inactiveFontFamily,
                          },
                          labelStyle,
                        ]}
                      >
                        {route.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CustomTabView;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  track: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(8),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(14),
  },
  label: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interSemiBold,
  },
});
