import React, { useMemo, useRef, useState, memo, useCallback } from 'react';
import { View, Image, StatusBar, Pressable } from 'react-native';
import { styles } from './MapScreenStyle';
import { Images } from '../../../utils/Images';
import Color from '../../../utils/Color';
import { scale } from '../../../utils/Responsive';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapComponent from '../../../components/showGathering/MapComponent';
import GatheringListView from '../../../components/showGathering/GatheringListView';
import { requestLocationPermission } from '../../../utils/ReusableFunctions';
import { getGatheringApi } from './useMap';
import ToastMessage from '../../../utils/ToastMessage';

let Img = Image;
let IMG_PRIORITY = undefined;
try {
  const F = reqstylesre('react-native-fast-image');
  Img = F.default || F;
  IMG_PRIORITY = F.priority;
} catch {}

const PLACES = [
  {
    id: '1',
    title: 'Statue of Unity',
    lat: 21.8385,
    lng: 73.7193,
    image:
      'https://statueofunityguide.in/wp-content/uploads/2021/12/Untitled-1.png',
    type: 'statue',
    ring: '#7c4dff',
  },
  {
    id: '2',
    title: 'shree ram mandir, ayodhya',
    lat: 26.7956,
    lng: 82.1944,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLGGcDWb2HgApnvvq43higQXyHg-2LJ4qUfg&s',
    type: 'temple',
    ring: '#ffb300',
  },
  {
    id: '3',
    title: 'Makerspace',
    lat: 38.997,
    lng: -76.982,
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop',
    type: 'workshop',
    ring: '#4caf50',
  },
  {
    id: '4',
    title: 'Night Market',
    lat: 38.99,
    lng: -76.981,
    image:
      'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=600&auto=format&fit=crop',
    type: 'market',
    ring: '#3b82f6',
  },
];

const IconComponent = ({ onPress, content, customStyle }) => {
  return (
    <Pressable style={[styles.iconView, customStyle]} onPress={onPress}>
      {content}
    </Pressable>
  );
};

const MapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [changeView, setChangeView] = useState('MapView');
  const [showTopBtnView, setShowTopBtnView] = useState(false);
  const [gatheringData, setGatheringData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        requestLocationPermission();
      }, 1500);

      setChangeView('MapView');
      getGatheringData();
    }, []),
  );

  // =========================================== Api ========================================== //

  const getGatheringData = useCallback(async () => {
    try {
      const response = await getGatheringApi();
      if (response?.success) {
        setGatheringData(response?.data);
      }
    } catch (error) {
      ToastMessage(error?.message);
      console.log('error in get gathering api', error);
    }
  }, []);

  // =========================================== Api ========================================== //

  const firstPlaceRegion = useMemo(() => {
    const p = PLACES[0];
    if (!p)
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 60,
        longitudeDelta: 60,
      };
    return {
      latitude: p.lat,
      longitude: p.lng,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    };
  }, []);

  const initialRegion = firstPlaceRegion;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={Color.transparent}
        barStyle={changeView === 'MapView' ? 'light-content' : 'dark-content'}
      />
      {changeView === 'MapView' ? (
        <MapComponent
          ref={mapRef}
          places={PLACES}
          initialRegion={initialRegion}
          onMarkerPress={setSelected}
          styles={styles}
        />
      ) : (
        <GatheringListView
          showTopBtnView={showTopBtnView}
          gatheringData={gatheringData}
        />
      )}

      <View style={styles.iconContainer}>
        <IconComponent
          onPress={() => {
            setShowTopBtnView(false);
            setChangeView(changeView === 'MapView' ? 'ListView' : 'MapView');
          }}
          content={
            changeView === 'MapView' ? (
              <Image source={Images.infoIcon} style={styles.icon} />
            ) : (
              <Image source={Images.infoIcon1} style={styles.icon} />
            )
          }
        />
        <IconComponent
          onPress={() => {
            setShowTopBtnView(!showTopBtnView);
            setChangeView('ListView');
          }}
          content={<Image source={Images.savedIcon} style={styles.icon} />}
          customStyle={{ marginRight: scale(110) }}
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.information)}
          content={
            <Image source={Images.informationIcon} style={styles.icon} />
          }
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.createGathering)}
          content={<Image source={Images.createIcon} style={styles.icon} />}
        />
        <IconComponent
          onPress={() => navigation.navigate(screenName.filter)}
          content={<Image source={Images.filterIcon} style={styles.icon} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(MapScreen);
