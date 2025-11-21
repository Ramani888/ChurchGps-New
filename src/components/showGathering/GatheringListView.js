import React, { useCallback, memo } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../custome/CustomButton';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import { Shadow } from 'react-native-shadow-2';
import LocationPreview from '../LocationPreview';

const CARD_WIDTH = scale(155.5);
const CARD_HEIGHT = scale(70);

// ===================== Small Item Card (Category / Location) ===================== //

const SmallCard = memo(({ label, imageSource }) => {
  return (
    <Shadow
      offset={[0, 0]}
      distance={24}
      startColor="rgba(0,0,0,0.04)"
      finalColor="rgba(0,0,0,0)"
      radius={12}
      style={styles.cardBox}
    >
      {imageSource && <Image source={imageSource} style={styles.categoryImage} />}
      <Text style={styles.categoryText}>{label}</Text>
    </Shadow>
  );
});

// ===================== Gathering Item (one row in the list) ===================== //

const GatheringItem = memo(({ item, getCategoryImage, getLocationImage }) => {
  const renderCategory = useCallback(
    ({ item: category }) => {
      const img = getCategoryImage(category);
      return <SmallCard label={category} imageSource={img} />;
    },
    [getCategoryImage],
  );

  const renderLocationType = useCallback(
    ({ item: loc }) => {
      const img = getLocationImage(loc);
      return <SmallCard label={loc} imageSource={img} />;
    },
    [getLocationImage],
  );

  return (
    <View style={styles.gatheringListView}>
      <View style={styles.groupNameView}>
        <View style={styles.groupNameView}>
          <Image
            source={item?.groupPicture ? { uri: item?.groupPicture } : Images.groupPictureImageIcon}
            style={styles.image}
          />
          <Text style={styles.heading}>{item?.groupName}</Text>
        </View>

        <View style={[styles.groupNameView, { gap: scale(4) }]}>
          <Text style={styles.groupMemberLength}>{'(36)'}</Text>
          <Image source={Images.userGroupImageIcon} style={styles.userGroupIcon} />
        </View>
      </View>

      <Text style={styles.heading}>{strings.gathering}</Text>
      <FlatList
        data={item?.categories || []}
        renderItem={renderCategory}
        keyExtractor={(cat, index) => `${cat}-${index}`}
        numColumns={2}
        key={'categories'}
        columnWrapperStyle={styles.flatlistColumnStyle}
        scrollEnabled={false}
        removeClippedSubviews
      />

      <Text style={styles.heading}>{strings.location}</Text>
      <FlatList
        data={item?.locationTypes || []}
        renderItem={renderLocationType}
        keyExtractor={(loc, index) => `${loc}-${index}`}
        numColumns={2}
        key={'locations'}
        columnWrapperStyle={styles.flatlistColumnStyle}
        scrollEnabled={false}
        removeClippedSubviews
      />

      <View style={styles.locationPreview}>
        <LocationPreview
          latitude={item?.coordinates?.latitude}
          longitude={item?.coordinates?.longitude}
        />

        {item?.coordinates?.latitude && item?.coordinates?.longitude && (
          <CustomButton
            title={strings.openDirectionInMap}
            buttonWidth={scale(155)}
            buttonHeight={verticalScale(34)}
            backgroundColor={Color.rgba.Green[1]}
            borderRadius={scale(16)}
            fontSize={moderateScale(12)}
            fontColor={Color.Black}
            fontFamily={Fonts.interRegular}
            marginTop={verticalScale(15)}
            marginBottom={verticalScale(10)}
            borderWidth={scale(1)}
            borderColor={Color.theme1}
            onPress={() => {}}
          />
        )}
      </View>

      <Text style={styles.heading}>{strings.description}</Text>
      <Text style={styles.descriptionText}>{item?.description}</Text>
    </View>
  );
});

// ===================== Main List Component ===================== //

const GatheringListView = ({ showTopBtnView, gatheringData }) => {
  console.log('gatheringData', gatheringData);

  const getCategoryImage = useCallback(name => {
    switch (name) {
      case 'Music':
        return Images.musicImage;
      case 'Bible Study':
        return Images.bibleStudyImage;
      default:
        return null;
    }
  }, []);

  const getLocationImage = useCallback(name => {
    switch (name) {
      case 'Outdors':
        return Images.outDorsImage;
      case 'Home':
        return Images.milesImage;
      default:
        return null;
    }
  }, []);

  const renderGatheringList = useCallback(
    ({ item }) => (
      <GatheringItem
        item={item}
        getCategoryImage={getCategoryImage}
        getLocationImage={getLocationImage}
      />
    ),
    [getCategoryImage, getLocationImage],
  );

  const keyExtractor = useCallback((item, index) => item._id?.toString() || index.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      {/* {isFocused && <StatusBar backgroundColor={Color.Gray1} />} */}

      {/* Top buttons (Saved / Removed) */}
      {showTopBtnView && (
        <View style={styles.topButtonView}>
          <CustomButton
            title={strings.saved}
            buttonWidth={scale(159)}
            buttonHeight={verticalScale(36)}
            backgroundColor={Color.White}
            borderRadius={scale(30)}
            fontSize={moderateScale(14)}
            fontColor={Color.Black}
            fontFamily={Fonts.interMedium}
            marginTop={verticalScale(0)}
            marginBottom={verticalScale(20)}
            leftIcon={<Image source={Images.savedAllIcon} style={styles.checkIcon} />}
            gap={scale(5)}
            onPress={() => {}}
          />
          <CustomButton
            title={strings.removed}
            buttonWidth={scale(159)}
            buttonHeight={verticalScale(36)}
            backgroundColor={Color.White}
            borderRadius={scale(30)}
            fontSize={moderateScale(14)}
            fontColor={Color.Black}
            fontFamily={Fonts.interMedium}
            marginTop={verticalScale(0)}
            marginBottom={verticalScale(20)}
            leftIcon={<Image source={Images.removedAllIcon} style={styles.checkIcon} />}
            gap={scale(5)}
            onPress={() => {}}
          />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: showTopBtnView ? verticalScale(0) : verticalScale(65),
        }}
      >
        <FlatList
          data={gatheringData || []}
          renderItem={renderGatheringList}
          keyExtractor={keyExtractor}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews
          decelerationRate="fast"
          scrollEnabled={false}
          viewabilityConfig={{ itemVisiblePercentThreshold: 10 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(GatheringListView);

// ===================== Styles ===================== //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Gray1,
    paddingHorizontal: scale(15),
  },
  topButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(70),
  },
  checkIcon: { width: scale(20), height: verticalScale(20) },
  gatheringListView: {
    backgroundColor: Color.White,
    padding: scale(11.5),
    borderRadius: scale(20),
    marginBottom: verticalScale(15),
  },
  groupNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  image: { width: scale(24), height: scale(24) },
  heading: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    paddingVertical: verticalScale(5),
  },
  groupMemberLength: {
    fontSize: moderateScale(12),
    color: Color.Gray,
    fontFamily: Fonts.interMedium,
  },
  userGroupIcon: { width: scale(20), height: scale(20) },
  cardBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: scale(16),
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
  },
  categoryImage: { width: scale(32), height: scale(32) },
  categoryText: {
    fontSize: moderateScale(12),
    color: Color.Black,
    fontFamily: Fonts.interRegular,
  },
  flatlistColumnStyle: {
    justifyContent: 'space-between',
    marginVertical: verticalScale(6),
  },
  locationImage: { width: scale(319), height: verticalScale(140) },
  locationPreview: { marginTop: verticalScale(15) },
  descriptionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.interRegular,
    color: Color.rgba.Black[4],
  },
});
