import React, { useMemo, useRef, useState, memo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewClustering from 'react-native-map-clustering';
import { styles } from './MapScreenStyle';
import { Images } from '../../../utils/Images';
import Color from '../../../utils/Color';
import { scale } from '../../../utils/Responsive';
import ActionSheet from 'react-native-actions-sheet';
import SwitchModeBottomsheetContent from '../../../components/bottomSheetContent/SwitchModeBottomsheetContent';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }], // overall land color
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#523735' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#a0c4ff' }], // 💧 river/lake color
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }], // 🛣 road color
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffd6a5' }], // highlight highways
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#ffb5a7' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#fefae0' }], // 🌿 land color
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b7e4c7' }], // 🌳 park color
  },
];

const PhotoMarker = memo(function PhotoMarker({ place, onPress }) {
  const [pinLoaded, setPinLoaded] = useState(false);
  const [calloutLoaded, setCalloutLoaded] = useState(false);

  const tracksViewChanges = !(pinLoaded && calloutLoaded);

  return (
    <Marker
      coordinate={{ latitude: place.lat, longitude: place.lng }}
      title={place.title}
      tracksViewChanges={tracksViewChanges}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={() => {
        onPress?.(place);
        setCalloutLoaded(false);
      }}
    >
      <Img
        source={{
          uri: place.image,
          ...(IMG_PRIORITY ? { priority: IMG_PRIORITY.high } : {}),
        }}
        style={styles.pinImage}
        onLoad={() => setPinLoaded(true)}
      />
      <View style={styles.pinDots} />

      {/* CALLOUT */}
      <Callout tooltip>
        <View
          style={styles.popup}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
        >
          <Text style={styles.popupTitle}>{place.title}</Text>
          {place.type ? (
            <Text style={styles.popupSub}>{place.type}</Text>
          ) : null}
          <Img
            source={{ uri: place.image }}
            style={styles.popupImage}
            resizeMode="cover"
            onLoad={() => setCalloutLoaded(true)}
          />
        </View>
      </Callout>
    </Marker>
  );
});

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
  const SheetRef = useRef();

  const [selected, setSelected] = useState(null);
  const [infoIcon, setInfoIcon] = useState(false);

  const openSwitchModeSheet = useCallback(() => {
    SheetRef.current.show();
  }, []);

  const closeSwitchModeSheet = useCallback(() => {
    SheetRef.current.hide();
  }, []);

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
      latitudeDelta: 0.15, // tweak zoom as you like
      longitudeDelta: 0.15,
    };
  }, []);

  const initialRegion = firstPlaceRegion;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={Color.transparent} />
      <MapViewClustering
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        MapView={MapView}
        initialRegion={initialRegion}
        radius={Platform.select({ ios: 40, android: 50 })}
        extent={512}
        spiralEnabled
        animationEnabled
        // customMapStyle={mapStyle}
        onMapReady={() => {
          if (initialRegion) {
            mapRef.current?.animateToRegion(initialRegion, 400);
          }
        }}
      >
        {PLACES.map(p => (
          <PhotoMarker key={p.id} place={p} onPress={setSelected} />
        ))}
      </MapViewClustering>

      <View style={styles.iconContainer}>
        <IconComponent
          onPress={openSwitchModeSheet}
          content={<Image source={Images.switchIcon} style={styles.icon} />}
        />
        <IconComponent
          onPress={() =>
            navigation.navigate(screenName.infoList, { saved: false })
          }
          content={<Image source={Images.infoIcon} style={styles.icon} />}
          customStyle={{ marginRight: scale(60) }}
        />
        <IconComponent
          onPress={() =>
            navigation.navigate(screenName.infoList, { saved: true })
          }
          content={<Image source={Images.savedIcon} style={styles.icon} />}
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

      <CustomBottomsheet
        ref={SheetRef}
        onBottomsheetClose={closeSwitchModeSheet}
        bottomSheetContent={<SwitchModeBottomsheetContent />}
      />
    </SafeAreaView>
  );
};

export default memo(MapScreen);
