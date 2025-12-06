import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { strings } from '../../language/strings';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';
import { Shadow } from 'react-native-shadow-2';
import CustomInputField from '../../custome/CustomInputField';

const CARD_WIDTH = scale(145);
const CARD_HEIGHT = scale(100);

const SmallCard = memo(({ label, imageSource }) => {
  return (
    <Shadow
      distance={5}
      startColor="rgba(0,0,0,0.02)"
      finalColor="rgba(0,0,0,0.02)"
      style={styles.cardBox}
    >
      {imageSource && <Image source={imageSource} style={styles.categoryImage} />}
      <Text style={styles.categoryText}>{label}</Text>
    </Shadow>
  );
});

const FilterSearchBottomsheetContent = () => {
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
      case 'Miles':
        return Images.milesImage;
      default:
        return null;
    }
  }, []);

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
    <View>
      <GradientText
        text={strings.search}
        colors={Color.gradientColor3}
        style={styles.mainHeading}
      />

      <CustomInputField
        placeholder={strings.enterGroupcode}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        errors={errors.email}
        touched={touched.email}
        inputStyle={styles.inputStyle}
      />

      <View style={styles.gatheringListView}>
        <View style={styles.groupNameView}>
          <View style={styles.groupNameView}>
            <Image source={Images.groupPictureImageIcon} style={styles.image} />
            <Text style={styles.heading}>Jims Church</Text>
          </View>

          <View style={[styles.groupNameView, { gap: scale(4) }]}>
            <Text style={styles.groupMemberLength}>{'(36)'}</Text>
            <Image source={Images.userGroupImageIcon} style={styles.userGroupIcon} />
          </View>
        </View>
        <View style={styles.devider} />

        <Text style={styles.heading}>{strings.gathering}</Text>
        <FlatList
          data={['Bible Study', 'Music']}
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
          data={['Outdors', 'Miles']}
          renderItem={renderLocationType}
          keyExtractor={(loc, index) => `${loc}-${index}`}
          numColumns={2}
          key={'locations'}
          columnWrapperStyle={styles.flatlistColumnStyle}
          scrollEnabled={false}
          removeClippedSubviews
        />

        <Text style={styles.heading}>{strings.description}</Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.{' '}
        </Text>

        <View style={styles.iconView}>
          <TouchableOpacity>
            <Image source={Images.userIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.savedIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.removeIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterSearchBottomsheetContent;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(10),
  },
  gatheringListView: {
    backgroundColor: Color.White,
    padding: scale(11.5),
    borderRadius: scale(20),
    marginBottom: verticalScale(15),
    marginHorizontal: scale(15),
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
  devider: {
    width: scale(331),
    height: verticalScale(1),
    backgroundColor: Color.rgba.Gray[2],
    marginVertical: verticalScale(10),
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
    marginHorizontal: scale(7),
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
