import React, { memo, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomTabView from '../../../custome/CustomTabView';
import CustomHeader from '../../../custome/CustomHeader';
import { styles } from './TermsAndPrivacyStyle';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import Color from '../../../utils/Color';
import TermsAndCondition from '../../../components/termsAndService/TermsAndCondition';
import PrivacyPolicy from '../../../components/termsAndService/PrivacyPolicy';
import { strings } from '../../../language/strings';
import { SafeAreaView } from 'react-native-safe-area-context';

const Terms = memo(() => (
  <View style={styles.tabComponent}>
    <TermsAndCondition />
  </View>
));

const Privacy = memo(() => (
  <View style={styles.tabComponent}>
    <PrivacyPolicy />
  </View>
));

const TermsAndPrivacy = () => {
  const tabDims = useMemo(
    () => ({
      height: verticalScale(50),
      borderRadius: scale(16),
      indicatorPillRadius: scale(12),
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
      { key: 'terms', title: strings.termsAndConditions, component: Terms },
      { key: 'privacy', title: strings.privacyPolicy, component: Privacy },
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
      inactiveColor: Color.Gray,
      indicatorColor: Color.theme1,
      indicatorHeight: tabDims.indicatorHeight,
      indicatorWidth: tabDims.indicatorWidth,
      tabStyle: { paddingHorizontal: tabDims.tabPaddingX },
      labelStyle: { fontSize: tabDims.labelFontSize },
    }),
    [tabDims],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible />
      <CustomTabView
        tabs={tabs}
        initialIndex={0}
        swipeEnabled
        tabBar={tabBar}
      />
    </SafeAreaView>
  );
};

export default memo(TermsAndPrivacy);
