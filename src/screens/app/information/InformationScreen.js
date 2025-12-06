import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { styles } from './InformationScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../custome/CustomHeader';
import { Images } from '../../../utils/Images';
import { strings } from '../../../language/strings';
import { Shadow } from 'react-native-shadow-2';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { screen } from '../../../utils/NavigationKey';
import Color from '../../../utils/Color';
import CustomButton from '../../../custome/CustomButton';
import { Fonts } from '../../../utils/Font';
import { useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';

const InformationScreen = () => {
  const navigation = useNavigation();
  const [onToggle, setOnToggle] = useState(true);

  const data = useMemo(
    () => [
      { image: Images.musicImage, name: strings.music, desc: strings.musicInfoText },
      { image: Images.bibleStudyImage, name: strings.bibleStudy, desc: strings.bibleStudyInfoText },
      { image: Images.publikHelpImage, name: strings.publicHelp, desc: strings.publikHelpInfoText },
      {
        image: Images.fullServiceImage,
        name: strings.fullService,
        desc: strings.fullServiceInfoText,
      },
      { image: Images.casualImage, name: strings.casual, desc: strings.causalInfoText },
      { image: Images.evangelismImage, name: strings.evangelize, desc: strings.evangalismInfoText },
    ],
    [Images, strings],
  );

  const colorData = useMemo(
    () => [
      { image: Images.outDorsImage1, name: strings.greenOutdors },
      { image: Images.homeImage, name: strings.yellowHome },
      { image: Images.churchImage, name: strings.blueChurch },
      {
        image: Images.otherImage,
        name: strings.purpleOther,
      },
    ],
    [Images, strings],
  );

  const renderData = useCallback(({ item }) => {
    return (
      <View style={styles.itemView}>
        <View style={styles.imageView}>
          <Image source={item?.image} style={[styles.image, { height: verticalScale(40) }]} />
          <Text style={styles.infoheadingText}>{item?.name}</Text>
        </View>
        <Text style={styles.description}>{item?.desc}</Text>
      </View>
    );
  }, []);

  const renderColorData = useCallback(({ item }) => {
    return (
      <View style={styles.imageView}>
        <Image source={item?.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.infoheadingText}>{item?.name}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible titleImageIcon={Images.infoIcon} />

      <ScrollView contentContainerStyle={styles.infoView}>
        <Text style={styles.infoheadingText}>{strings.infoHeadingText}</Text>

        <Shadow
          distance={15}
          startColor="rgba(0,0,0,0.04)"
          finalColor="rgba(0,0,0,0.04)"
          style={styles.shadowView}
        >
          <Text style={[styles.infoheadingText, { fontSize: moderateScale(16) }]}>
            {strings.icons}
          </Text>

          <FlatList data={data} renderItem={renderData} />
        </Shadow>

        <View style={styles.devider} />

        <Text style={[styles.infoheadingText, { fontSize: moderateScale(16) }]}>
          {strings.gpsColor}
        </Text>

        <FlatList data={colorData} renderItem={renderColorData} style={styles.colorFlatlist} />

        <Text style={[styles.infoheadingText, { fontSize: moderateScale(16) }]}>
          {strings.locationType}
        </Text>

        <View style={styles.locationTypeView}>
          <View style={styles.locationType}>
            <Image
              source={Images.approxLocationtypeImage}
              style={[styles.image, { height: verticalScale(40) }]}
              resizeMode="contain"
            />
            <Text style={styles.locationTypeText}>{strings.approximateLocation}</Text>
            <Text style={styles.locationTypeDesc}>{strings.approximateLocationDesc}</Text>
          </View>

          <View style={styles.locationType}>
            <Image
              source={Images.presizeLocationtypeImage}
              style={[styles.image, { height: verticalScale(40) }]}
              resizeMode="contain"
            />
            <Text style={styles.locationTypeText}>{strings.approximateLocation}</Text>
            <Text style={styles.locationTypeDesc}>{strings.approximateLocationDesc}</Text>
          </View>
        </View>

        <Text style={[styles.infoheadingText, { fontSize: moderateScale(16) }]}>
          {strings.communityBoard}
        </Text>
        <Image source={Images.gridcon} style={styles.communityBoardImage} tintColor={Color.Black} />
        <Text style={styles.communityBoardText}>{strings.communityboardText}</Text>

        <Text style={styles.noteText}>{strings.note}</Text>

        <View style={styles.toggleView}>
          <Text style={styles.searchModeText}>{strings.searchMode}</Text>
          <ToggleSwitch
            isOn={onToggle}
            onColor={Color.Pink}
            offColor={Color.Gray}
            size="large"
            onToggle={() => setOnToggle(!onToggle)}
          />
        </View>

        <CustomButton
          title={strings.close}
          backgroundColor={Color.theme1}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.Black}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(0)}
          marginBottom={verticalScale(20)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(InformationScreen);
