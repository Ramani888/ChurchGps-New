import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../custome/CustomButton';
import { strings } from '../../language/strings';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import { useIsFocused } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const GatheringListView = ({ showTopBtnView, gatheringData }) => {
  const isFocused = useIsFocused();

  const getCategoryImage = name => {
    switch (name) {
      case 'Music':
        return Images.musicImage;
      case 'Bible Study':
        return Images.bibleStudyImage;
      default:
        return null;
    }
  };

  const getLocationImage = name => {
    switch (name) {
      case 'Outdors':
        return Images.outDorsImage;
      case 'Home':
        return Images.milesImage;
      default:
        return null;
    }
  };

  const renderCategories = useCallback(({ item }) => {
    const img = getCategoryImage(item);

    return (
      <Shadow
        offset={[0, 0]}
        distance={24}
        startColor="rgba(0,0,0,0.04)"
        finalColor="rgba(0,0,0,0)"
        radius={12}
        style={styles.cardBox}
      >
        {img && <Image source={img} style={styles.categoryImage} />}
        <Text style={styles.categoryText}>{item}</Text>
      </Shadow>
    );
  }, []);

  const renderLocationType = useCallback(({ item }) => {
    const img = getLocationImage(item);

    return (
      <Shadow
        offset={[0, 0]}
        distance={24}
        startColor="rgba(0,0,0,0.04)"
        finalColor="rgba(0,0,0,0)"
        radius={12}
        style={styles.cardBox}
      >
        {img && <Image source={img} style={styles.categoryImage} />}
        <Text style={styles.categoryText}>{item}</Text>
      </Shadow>
    );
  }, []);

  const renderGatheringList = useCallback(
    ({ item }) => {
      return (
        <View style={styles.gatheringListView}>
          <View style={styles.groupNameView}>
            <View style={styles.groupNameView}>
              <Image
                source={
                  item?.groupPicture
                    ? { uri: item?.groupPicture }
                    : Images.groupPictureImageIcon
                }
                style={styles.image}
              />
              <Text style={styles.heading}>{item?.groupName}</Text>
            </View>
            <View style={[styles.groupNameView, { gap: scale(4) }]}>
              <Text style={styles.groupMemberLength}>{'(36)'}</Text>
              <Image
                source={Images.userGroupImageIcon}
                style={styles.userGroupIcon}
              />
            </View>
          </View>

          <Text style={styles.heading}>{strings.gathering}</Text>
          <FlatList
            data={item?.categories}
            renderItem={renderCategories}
            keyExtractor={(cat, index) => `${cat}-${index}`}
            numColumns={2}
            key={'_'}
            columnWrapperStyle={styles.flatlistColumnStyle}
          />

          <Text style={styles.heading}>{strings.location}</Text>
          <FlatList
            data={item?.locationTypes}
            renderItem={renderLocationType}
            keyExtractor={(loc, index) => `${loc}-${index}`}
            numColumns={2}
            key={'__'}
            columnWrapperStyle={styles.flatlistColumnStyle}
          />
        </View>
      );
    },
    [renderCategories, renderLocationType],
  );

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && <StatusBar backgroundColor={Color.Gray1} />}
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
            leftIcon={
              <Image source={Images.savedAllIcon} style={styles.checkIcon} />
            }
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
            leftIcon={
              <Image source={Images.removedAllIcon} style={styles.checkIcon} />
            }
            gap={scale(5)}
            onPress={() => {}}
          />
        </View>
      )}

      <View>
        <FlatList
          data={gatheringData}
          renderItem={renderGatheringList}
          keyExtractor={(item, index) =>
            item._id?.toString() || index.toString()
          }
          style={[
            styles.flatlist,
            {
              marginTop: showTopBtnView ? verticalScale(0) : verticalScale(65),
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default GatheringListView;

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
    width: scale(155.5),
    height: scale(70),
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
});
