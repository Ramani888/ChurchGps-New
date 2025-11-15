import { Image, Pressable, Text, View } from 'react-native';
import React, { memo, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CommunityBoardScreenStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { Images } from '../../../utils/Images';
import { strings } from '../../../language/strings';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomTabView from '../../../custome/CustomTabView';
import Color from '../../../utils/Color';
import CommunityBoardOnline from '../../../components/communityBoard/CommunityBoardOnline';
import CommunityBoardLocal from '../../../components/communityBoard/CommunityBoardLocal';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';

const Online = memo(() => (
  <View style={styles.tabComponent}>
    <CommunityBoardOnline />
  </View>
));

const Local = memo(() => (
  <View style={styles.tabComponent}>
    <CommunityBoardLocal />
  </View>
));

const CommunityBoardScreen = () => {
  const navigation = useNavigation();

  const tabDims = useMemo(
    () => ({
      height: verticalScale(48),
      borderRadius: scale(24),
      indicatorPillRadius: scale(24),
      indicatorHeight: verticalScale(42),
      indicatorWidth: scale(168),
      containerHorizontal: scale(16),
      containerTop: verticalScale(8),
      tabPaddingX: scale(14),
      paddingHorizontal: scale(10),
      gap: scale(12),
      labelFontSize: moderateScale(12),
      width: scale(343),
    }),
    [],
  );

  const tabs = useMemo(
    () => [
      { key: 'online', title: strings.online, component: Online },
      { key: 'local', title: strings.local, component: Local },
    ],
    [strings],
  );

  const tabBar = useMemo(
    () => ({
      height: tabDims.height,
      borderRadius: tabDims.borderRadius,
      indicatorPillRadius: tabDims.indicatorPillRadius,
      backgroundColor: 'transparent',
      containerStyle: {
        marginHorizontal: tabDims.containerHorizontal,
        marginTop: tabDims.containerTop,
        backgroundColor: Color.rgba.Gray[2],
        overflow: 'hidden',
        width: tabDims.width,
      },
      scrollEnabled: false,
      paddingHorizontal: tabDims.paddingHorizontal,
      gap: tabDims.gap,
      activeColor: Color.Black,
      inactiveColor: Color.Black,
      indicatorColor: Color.White,
      indicatorHeight: tabDims.indicatorHeight,
      indicatorWidth: tabDims.indicatorWidth,
      tabStyle: { paddingHorizontal: tabDims.tabPaddingX },
      labelStyle: {
        fontSize: tabDims.labelFontSize,
      },
      leftImage: <Image source={Images.checkIcon} style={styles.tabIcon} />,
    }),
    [tabDims],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        gradientTitle={strings.communityBoard}
        titleFontSize={scale(31)}
        infoIcon={Images.informationIcon}
        infoIconPress={() => {}}
      />
      <CustomTabView
        tabs={tabs}
        initialIndex={0}
        swipeEnabled
        tabBar={tabBar}
      />
      <Pressable
        style={styles.fabButton}
        onPress={() => navigation.navigate(screenName.createCommunityBoard)}
      >
        <Image source={Images.plusFabIcon} style={styles.fabIcon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default memo(CommunityBoardScreen);
