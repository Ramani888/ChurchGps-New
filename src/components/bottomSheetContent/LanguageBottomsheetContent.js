// import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { strings } from '../../language/strings';
// import Color from '../../utils/Color';
// import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
// import { Fonts } from '../../utils/Font';
// import GradientText from '../GradientText';
// import { useLanguage } from '../../context/languageContext/LanguageContext';
// import { useStateContext } from '../../context/StateContext';
// import CustomTabView from '../../custome/CustomTabView';

// const PreferredLanguage = memo(({ languageData, renderLanguage, onHeight }) => {
//   const [headerH, setHeaderH] = useState(0);

//   const onHeaderLayout = e => {
//     setHeaderH(e.nativeEvent.layout.height || 0);
//   };

//   const onListContentSizeChange = (w, h) => {
//     const total = headerH + h;
//     onHeight && onHeight(total);
//   };

//   return (
//     <View style={styles.tabComponent} pointerEvents="box-none">
//       <Text style={styles.informTabText} onLayout={onHeaderLayout}>
//         {strings.informPreferredLanguage}
//       </Text>
//       <FlatList
//         data={languageData}
//         renderItem={renderLanguage}
//         style={styles.languageFlatlist}
//         onContentSizeChange={onListContentSizeChange}
//       />
//     </View>
//   );
// });

// const CommunityLanguages = memo(
//   ({ languageData, renderLanguage, onHeight }) => {
//     const [headerH, setHeaderH] = useState(0);

//     const onHeaderLayout = e => {
//       setHeaderH(e.nativeEvent.layout.height || 0);
//     };

//     const onListContentSizeChange = (w, h) => {
//       // include header + list content height
//       const total = headerH + h;
//       onHeight && onHeight(total);
//     };

//     return (
//       <View style={styles.tabComponent} pointerEvents="box-none">
//         <Text style={styles.informTabText} onLayout={onHeaderLayout}>
//           {strings.informCommunityLanguage}
//         </Text>
//         <FlatList
//           data={languageData}
//           renderItem={renderLanguage}
//           style={styles.languageFlatlist}
//           onContentSizeChange={onListContentSizeChange}
//         />
//       </View>
//     );
//   },
// );

// const LanguageBottomsheetContent = () => {
//   const [activeTab, setActiveTab] = useState('preferredLanguage');
//   const [preferredHeight, setPreferredHeight] = useState(0);
//   const [communityHeight, setCommunityHeight] = useState(0);
//   const {
//     selectedLanguage,
//     onChangeLanguage,
//     setCurrentLanguage,
//     currentLanguage,
//     onChangeCommunityLanguages,
//     communityLanguages,
//   } = useLanguage();
//   const { languageChangeFromProfile, setLanguageChangeFromProfile } =
//     useStateContext();

//   const languageData = [
//     { language: 'Arabic', originalLanguage: 'اللغة العربية', code: 'ar' },
//     { language: 'English', originalLanguage: 'English', code: 'en' },
//     { language: 'French', originalLanguage: 'French', code: 'fr' },
//     { language: 'German', originalLanguage: 'Deutsch', code: 'de' },
//     { language: 'Japanese', originalLanguage: '日本語', code: 'ja' },
//     { language: 'Korean', originalLanguage: '한국어', code: 'ko' },
//     { language: 'Spanish', originalLanguage: 'Español', code: 'es' },
//   ];

//   useEffect(() => {
//     const current = languageData.find(item => item.code === selectedLanguage);
//     if (current) {
//       setCurrentLanguage(current.originalLanguage);
//     } else {
//       const english = languageData.find(item => item.code === 'en');
//       setCurrentLanguage(english?.originalLanguage || 'English');
//     }

//     return () => {
//       setLanguageChangeFromProfile(false);
//     };
//   }, [selectedLanguage]);

//   const tabDims = useMemo(
//     () => ({
//       height: verticalScale(48),
//       borderRadius: scale(24),
//       indicatorPillRadius: scale(24),
//       indicatorHeight: verticalScale(42),
//       indicatorWidth: scale(161.5),
//       containerHorizontal: scale(21),
//       containerTop: verticalScale(12),
//       tabPaddingX: scale(14),
//       paddingHorizontal: scale(10),
//       gap: scale(12),
//       labelFontSize: moderateScale(12),
//       width: scale(331),
//     }),
//     [],
//   );

//   const handlePreferredHeight = useCallback(height => {
//     setPreferredHeight(height);
//     console.log('PreferredLanguage height:', height);
//   }, []);

//   const handleCommunityHeight = useCallback(height => {
//     setCommunityHeight(height);
//     console.log('CommunityLanguage height:', height);
//   }, []);

//   const tabs = useMemo(
//     () => [
//       {
//         key: 'preferredLanguage',
//         title: strings.preferredLanguage,
//         component: () => (
//           <PreferredLanguage
//             languageData={languageData}
//             renderLanguage={renderLanguage}
//             onHeight={handlePreferredHeight}
//           />
//         ),
//       },
//       {
//         key: 'communityLanguages',
//         title: strings.communityLanguages,
//         component: () => (
//           <CommunityLanguages
//             languageData={languageData}
//             renderLanguage={renderLanguage}
//             onHeight={handleCommunityHeight}
//           />
//         ),
//       },
//     ],
//     [
//       strings,
//       languageData,
//       renderLanguage,
//       handlePreferredHeight,
//       handleCommunityHeight,
//     ],
//   );

//   const tabBar = useMemo(
//     () => ({
//       height: tabDims.height,
//       borderRadius: tabDims.borderRadius,
//       indicatorPillRadius: tabDims.indicatorPillRadius,
//       backgroundColor: 'transparent',
//       containerStyle: {
//         marginHorizontal: tabDims.containerHorizontal,
//         marginTop: tabDims.containerTop,
//         backgroundColor: Color.rgba.Gray[2],
//         overflow: 'hidden',
//         width: tabDims.width,
//       },
//       scrollEnabled: false,
//       paddingHorizontal: tabDims.paddingHorizontal,
//       gap: tabDims.gap,
//       activeColor: Color.Black,
//       inactiveColor: Color.Black,
//       indicatorColor: Color.White,
//       indicatorHeight: tabDims.indicatorHeight,
//       indicatorWidth: tabDims.indicatorWidth,
//       tabStyle: { paddingHorizontal: tabDims.tabPaddingX },
//       labelStyle: { fontSize: tabDims.labelFontSize },
//     }),
//     [tabDims],
//   );

//   const renderLanguage = useCallback(({ item }) => {
//     const isSelected = currentLanguage === item?.originalLanguage;

//     return (
//       <Pressable
//         style={[
//           styles.languageView,
//           {
//             borderWidth: isSelected ? scale(1) : scale(0.5),
//             borderColor: isSelected ? Color.theme1 : Color.rgba.Gray[4],
//           },
//         ]}
//         onPress={() => {
//           onChangeLanguage(item?.code, item?.originalLanguage);
//           setCurrentLanguage(item?.originalLanguage);
//         }}
//       >
//         <Text style={styles.languageStyle}>{item?.language}</Text>
//         <Text style={styles.originalLanguageStyle}>
//           {item?.originalLanguage}
//         </Text>
//       </Pressable>
//     );
//   }, []);

//   return (
//     <View style={styles.bottomsheetView}>
//       <GradientText
//         text={strings.selectLanguage}
//         colors={Color.gradientColor1}
//         style={styles.selectLanguageHeading}
//       />
//       {languageChangeFromProfile ? (
//         <View
//           style={{
//             height:
//               activeTab === 'preferredLanguage'
//                 ? preferredHeight + verticalScale(115)
//                 : communityHeight + verticalScale(130),
//           }}
//         >
//           <CustomTabView
//             tabs={tabs}
//             initialIndex={0}
//             swipeEnabled={true}
//             tabBar={tabBar}
//             onTabChange={(key, title) => {
//               setActiveTab(key);
//             }}
//           />
//         </View>
//       ) : (
//         <FlatList
//           data={languageData}
//           renderItem={renderLanguage}
//           style={[
//             styles.languageFlatlist,
//             {
//               paddingBottom: languageChangeFromProfile
//                 ? activeTab === 'preferredLanguage'
//                   ? verticalScale(110)
//                   : verticalScale(130)
//                 : 0,
//             },
//           ]}
//         />
//       )}
//     </View>
//   );
// };

// export default LanguageBottomsheetContent;

// const styles = StyleSheet.create({
//   selectLanguageHeading: {
//     fontSize: moderateScale(24),
//     fontFamily: Fonts.spaceGroteskBold,
//     textAlign: 'center',
//   },
//   bottomsheetView: { paddingVertical: scale(10) },
//   languageFlatlist: {
//     marginTop: verticalScale(6),
//     marginHorizontal: scale(15),
//     paddingHorizontal: scale(10),
//   },
//   languageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//     marginBottom: verticalScale(10),
//     height: verticalScale(46),
//     paddingLeft: scale(15),
//     borderRadius: scale(16),
//   },
//   languageStyle: {
//     fontSize: moderateScale(15),
//     fontFamily: Fonts.interSemiBold,
//     color: Color.Black,
//   },
//   originalLanguageStyle: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.interRegular,
//     color: 'rgba(159, 159, 159, 1)',
//   },
//   tabComponent: { margin: scale(15), flex: 1 },
//   informTabText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.interRegular,
//     color: Color.Black,
//     lineHeight: verticalScale(18),
//     textAlign: 'center',
//   },
// });

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import GradientText from '../GradientText';
import { useLanguage } from '../../context/languageContext/LanguageContext';
import { useStateContext } from '../../context/StateContext';
import CustomTabView from '../../custome/CustomTabView';

const PreferredLanguage = memo(
  ({
    languageData,
    renderLanguage,
    extraData,
    keyExtractor,
    getItemLayout,
  }) => {
    return (
      <View style={styles.tabComponent}>
        <Text style={styles.informTabText}>
          {strings.informPreferredLanguage}
        </Text>
        <FlatList
          data={languageData}
          renderItem={renderLanguage}
          keyExtractor={keyExtractor}
          extraData={extraData}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={5}
          style={styles.languageFlatlist}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  },
);

const CommunityLanguages = memo(
  ({
    languageData,
    renderLanguage,
    extraData,
    keyExtractor,
    getItemLayout,
  }) => {
    return (
      <View style={styles.tabComponent}>
        <Text style={styles.informTabText}>
          {strings.informCommunityLanguage}
        </Text>
        <FlatList
          data={languageData}
          renderItem={renderLanguage}
          keyExtractor={keyExtractor}
          extraData={extraData}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={5}
          style={styles.languageFlatlist}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  },
);

const LanguageBottomsheetContent = () => {
  const [activeTab, setActiveTab] = useState('preferredLanguage');
  const {
    selectedLanguage,
    onChangeLanguage,
    setCurrentLanguage,
    currentLanguage,
    onToggleCommunityLanguage,
    communityLanguages,
  } = useLanguage();
  const { languageChangeFromProfile, setLanguageChangeFromProfile } =
    useStateContext();

  const languageData = [
    { language: 'Arabic', originalLanguage: 'اللغة العربية', code: 'ar' },
    { language: 'English', originalLanguage: 'English', code: 'en' },
    { language: 'French', originalLanguage: 'French', code: 'fr' },
    { language: 'German', originalLanguage: 'Deutsch', code: 'de' },
    { language: 'Japanese', originalLanguage: '日本語', code: 'ja' },
    { language: 'Korean', originalLanguage: '한국어', code: 'ko' },
    { language: 'Spanish', originalLanguage: 'Español', code: 'es' },
  ];

  useEffect(() => {
    const current = languageData.find(item => item.code === selectedLanguage);
    if (current) {
      setCurrentLanguage(current.originalLanguage);
    } else {
      const english = languageData.find(item => item.code === 'en');
      setCurrentLanguage(english?.originalLanguage || 'English');
    }

    return () => {
      setLanguageChangeFromProfile(false);
    };
  }, [selectedLanguage]);

  const tabDims = useMemo(
    () => ({
      height: verticalScale(48),
      borderRadius: scale(24),
      indicatorPillRadius: scale(24),
      indicatorHeight: verticalScale(42),
      indicatorWidth: scale(161.5),
      containerHorizontal: scale(21),
      containerTop: verticalScale(12),
      tabPaddingX: scale(14),
      paddingHorizontal: scale(10),
      gap: scale(12),
      labelFontSize: moderateScale(12),
      width: scale(331),
    }),
    [],
  );

  const keyExtractor = useCallback(item => item.code, []);

  const rowHeight = useMemo(() => verticalScale(46) + verticalScale(10), []);
  const getItemLayout = useCallback(
    (_data, index) => ({
      length: rowHeight,
      offset: rowHeight * index,
      index,
    }),
    [rowHeight],
  );

  const listExtraData = useMemo(
    () => ({
      activeTab,
      currentLanguage,
      communityLanguagesLen: communityLanguages.length,
      selectedLanguage,
    }),
    [activeTab, currentLanguage, communityLanguages.length, selectedLanguage],
  );

  const tabs = useMemo(
    () => [
      {
        key: 'preferredLanguage',
        title: strings.preferredLanguage,
        component: () => (
          <PreferredLanguage
            languageData={languageData}
            renderLanguage={renderLanguage}
            extraData={listExtraData}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
          />
        ),
      },
      {
        key: 'communityLanguages',
        title: strings.communityLanguages,
        component: () => (
          <CommunityLanguages
            languageData={languageData}
            renderLanguage={renderLanguage}
            extraData={listExtraData}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
          />
        ),
      },
    ],
    [
      strings,
      languageData,
      renderLanguage,
      listExtraData,
      keyExtractor,
      getItemLayout,
    ],
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
      labelStyle: { fontSize: tabDims.labelFontSize },
    }),
    [tabDims],
  );

  const renderLanguage = useCallback(
    ({ item }) => {
      const isSelected =
        activeTab === 'communityLanguages'
          ? communityLanguages.includes(item.code)
          : currentLanguage === item.originalLanguage;

      return (
        <Pressable
          style={[
            styles.languageView,
            {
              borderWidth: isSelected ? scale(1) : scale(0.5),
              borderColor: isSelected ? Color.theme1 : Color.rgba.Gray[4],
            },
          ]}
          onPress={() => {
            if (activeTab === 'communityLanguages') {
              onToggleCommunityLanguage(item?.code);
            } else {
              onChangeLanguage(item?.code, item?.originalLanguage);
              setCurrentLanguage(item?.originalLanguage);
            }
          }}
        >
          <Text style={styles.languageStyle}>{item?.language}</Text>
          <Text style={styles.originalLanguageStyle}>
            {item?.originalLanguage}
          </Text>
        </Pressable>
      );
    },
    [activeTab, communityLanguages, currentLanguage],
  );

  const containerHeight = useMemo(
    () =>
      languageChangeFromProfile
        ? activeTab === 'preferredLanguage'
          ? verticalScale(525)
          : verticalScale(555)
        : null,
    [languageChangeFromProfile, activeTab],
  );

  return (
    <View style={styles.bottomsheetView}>
      <GradientText
        text={strings.selectLanguage}
        colors={Color.gradientColor1}
        style={styles.selectLanguageHeading}
      />
      {languageChangeFromProfile ? (
        <View
          style={containerHeight != null ? [{ height: containerHeight }] : null}
        >
          <CustomTabView
            tabs={tabs}
            initialIndex={0}
            swipeEnabled
            tabBar={tabBar}
            onTabChange={key => setActiveTab(key)}
          />
        </View>
      ) : (
        <FlatList
          data={languageData}
          renderItem={renderLanguage}
          keyExtractor={keyExtractor}
          extraData={listExtraData}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={5}
          style={[
            styles.languageFlatlist,
            {
              paddingBottom: languageChangeFromProfile
                ? activeTab === 'preferredLanguage'
                  ? verticalScale(110)
                  : verticalScale(130)
                : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LanguageBottomsheetContent;

const styles = StyleSheet.create({
  selectLanguageHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
  },
  bottomsheetView: { paddingVertical: scale(10) },
  languageFlatlist: {
    marginTop: verticalScale(6),
    marginHorizontal: scale(15),
    paddingHorizontal: scale(10),
  },
  languageView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: verticalScale(10),
    height: verticalScale(46),
    paddingLeft: scale(15),
    borderRadius: scale(16),
  },
  languageStyle: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
  },
  originalLanguageStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: 'rgba(159, 159, 159, 1)',
  },
  tabComponent: { margin: scale(15), flex: 1 },
  informTabText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    lineHeight: verticalScale(18),
    textAlign: 'center',
    paddingBottom: verticalScale(12),
  },
});
