import { FlatList, Image, Pressable, Text, View } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CommunityBoardScreenStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { scale, verticalScale } from '../../../utils/Responsive';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';
import { Images } from '../../../utils/Images';
import Color from '../../../utils/Color';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import CommunityBoardInformationContent from '../../../components/bottomSheetContent/CommunityBoardInformationContent';
import { BlurView } from '@react-native-community/blur';

const CommunityBoardScreen = () => {
  const navigation = useNavigation();
  const sheetRef = useRef();

  const [blurVisible, setBlurVisible] = useState(false);

  const data = [
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },

    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
    {
      image:
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
      title: 'Allison Gouse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateTime: 'July 3, 5:15 AM',
      distance: 2,
    },
  ];

  const openBottomsheet = useCallback(() => {
    sheetRef.current.show();
  }, []);

  const closeBottomsheet = useCallback(() => {
    sheetRef.current.hide();
  }, []);

  const renderList = useCallback(({ item, index }) => {
    return (
      <View>
        <View style={styles.listContainer}>
          <Image source={{ uri: item?.image }} style={styles.profileImage} />
          <View>
            <View style={styles.firstlineView}>
              <Text style={styles.titleStyle}>{item?.title}</Text>
              <Text style={[styles.textStyle, { color: Color.Gray }]}>{item?.dateTime}</Text>
              <Pressable onPress={() => {}}>
                <Image source={Images.threedotCircleImage} style={styles.image} />
              </Pressable>
            </View>
            <Text style={[styles.textStyle, styles.desc]}>{item?.desc}</Text>
            <View style={styles.distanceView}>
              <Image source={Images.locationIconImage} style={styles.image} />
              <Text style={[styles.textStyle, { color: Color.Black }]}>
                {item?.distance} {strings.mile}
              </Text>
            </View>
          </View>
        </View>
        {data?.length !== index + 1 && <View style={styles.devider} />}
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        gradientTitle={strings.communityBoard}
        titleFontSize={scale(31)}
        infoIcon={Images.infoIcon}
        infoIconPress={() => openBottomsheet()}
      />

      <View>
        <FlatList data={data} renderItem={renderList} contentContainerStyle={styles.flatlistView} />
      </View>

      <Pressable
        style={styles.fabButton}
        onPress={() => navigation.navigate(screenName.createCommunityBoard)}
      >
        <Image source={Images.plusFabIcon} style={styles.fabIcon} />
      </Pressable>

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={sheetRef} setBlurVisible={setBlurVisible}>
        <CommunityBoardInformationContent closeBottomsheet={closeBottomsheet} />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

export default memo(CommunityBoardScreen);
