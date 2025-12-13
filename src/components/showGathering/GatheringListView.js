import React, { useCallback, memo, useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../custome/CustomButton';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import { Shadow } from 'react-native-shadow-2';
import LocationPreview from '../LocationPreview';
import { Api } from '../../api/EndPoint';
import Loader from '../../utils/Loader';
import { apiDelete, apiGet, apiPost } from '../../api/ApiServices';
import ToastMessage from '../../utils/ToastMessage';
import { all } from 'axios';

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

const GatheringItem = memo(
  ({ item, getCategoryImage, getLocationImage, saveGatheringApi, removeGatheringApi }) => {
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
              source={
                item?.groupPicture ? { uri: item?.groupPicture } : Images.groupPictureImageIcon
              }
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

        <View style={styles.iconView}>
          <TouchableOpacity>
            <Image source={Images.userIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              item?.isSaved ? removeGatheringApi(item?._id) : saveGatheringApi(item?._id)
            }
          >
            <Image
              source={item?.isSaved ? Images.savedIconFill : Images.savedIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.removeIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

// ===================== Main List Component ===================== //

const GatheringListView = ({ showSavedGathering }) => {
  const [visible, setVisible] = useState(false);
  const [gatheringData, setGatheringData] = useState([]);
  const showSavedRef = useRef(showSavedGathering);

  useEffect(() => {
    showSavedRef.current = showSavedGathering;
    if (showSavedGathering) {
      getSavedGatheringData();
    } else {
      getGatheringData();
    }
  }, [showSavedGathering]);

  // ======================================= Api ========================================= //

  const getGatheringData = useCallback(async () => {
    try {
      setVisible(true);
      const response = await apiGet(Api.gathering);
      if (response?.success) {
        setGatheringData(response?.data);
      }
    } catch (error) {
      ToastMessage(error?.message);
      console.log('error in get gathering api', error);
    } finally {
      setVisible(false);
    }
  }, []);

  const getSavedGatheringData = useCallback(async () => {
    try {
      setVisible(true);
      const response = await apiGet(Api.getSavedGatherings);
      if (response?.success) {
        setGatheringData(response?.data);
      }
    } catch (error) {
      ToastMessage(error?.message);
      console.log('error in get gathering api', error);
    } finally {
      setVisible(false);
    }
  }, []);

  const saveGathering = useCallback(
    async id => {
      try {
        setVisible(true);
        const response = await apiPost(Api.saveGathering, { gatheringId: id });

        if (response?.success) {
          if (showSavedRef.current) {
            getSavedGatheringData();
          } else {
            getGatheringData();
          }
          ToastMessage(response?.message || 'Gathering saved successfully');
        } else {
          ToastMessage(response?.message || 'Failed to save gathering');
        }
      } catch (error) {
        console.log('Error saving gathering:', error);
      } finally {
        setVisible(false);
      }
    },
    [getGatheringData, getSavedGatheringData],
  );

  const removeGathering = useCallback(
    async id => {
      try {
        setVisible(true);
        const response = await apiDelete(`${Api.saveGathering}?gatheringId=${id}`);

        if (response?.success) {
          if (showSavedRef.current) {
            getSavedGatheringData();
          } else {
            getGatheringData();
          }
          ToastMessage(response?.message || 'Gathering removed successfully');
        } else {
          ToastMessage(response?.message || 'Failed to remove gathering');
        }
      } catch (error) {
        console.log('Error remove gathering:', error);
      } finally {
        setVisible(false);
      }
    },
    [getGatheringData, getSavedGatheringData],
  );

  const getSavedGathering = useCallback(async () => {}, []);

  // ======================================= End ========================================= //

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
        saveGatheringApi={saveGathering}
        removeGatheringApi={removeGathering}
      />
    ),
    [getCategoryImage, getLocationImage],
  );

  const keyExtractor = useCallback((item, index) => item._id?.toString() || index.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      {/* {isFocused && <StatusBar backgroundColor={Color.Gray1} />} */}
      <Loader visible={visible} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: verticalScale(55),
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
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: scale(10),
  },
  icon: { width: scale(20), height: scale(20) },
});
