import { Image, Text, View } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateGatheringScreenStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import CustomTabView from '../../../custome/CustomTabView';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CreateGatheringOnline from '../../../components/createGathering/CreateGatheringOnline';
import CreateGatheringLocal from '../../../components/createGathering/CreateGatheringLocal';
import Color from '../../../utils/Color';
import { Images } from '../../../utils/Images';

const Online = memo(() => (
  <View style={styles.tabComponent}>
    <CreateGatheringOnline />
  </View>
));

const Local = memo(() => (
  <View style={styles.tabComponent}>
    <CreateGatheringLocal />
  </View>
));

const CreateGatheringScreen = () => {
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
      <CustomHeader backArrowVisible gradientTitle={strings.createGathering} />
      <CustomTabView
        tabs={tabs}
        initialIndex={0}
        swipeEnabled
        tabBar={tabBar}
      />
    </SafeAreaView>
  );
};

export default memo(CreateGatheringScreen);
