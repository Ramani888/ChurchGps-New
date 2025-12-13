// import React, { memo, useState, forwardRef } from 'react';
// import { View, Text, StyleSheet, Platform } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import MapViewClustering from 'react-native-map-clustering';
// import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
// import { Fonts } from '../../utils/Font';
// import FastImage from 'react-native-fast-image';

// const PhotoMarker = memo(function PhotoMarker({ place, onPress }) {
//   const [pinLoaded, setPinLoaded] = useState(false);
//   const [calloutLoaded, setCalloutLoaded] = useState(false);
//   const tracksViewChanges = !(pinLoaded && calloutLoaded);

//   return (
//     <Marker
//       coordinate={{ latitude: place.lat, longitude: place.lng }}
//       title={place.title}
//       tracksViewChanges={tracksViewChanges}
//       anchor={{ x: 0.5, y: 0.5 }}
//       onPress={() => {
//         onPress?.(place);
//         setCalloutLoaded(false);
//       }}
//     >
//       <FastImage
//         source={{ uri: place.image }}
//         style={styles.pinImage}
//         onLoad={() => setPinLoaded(true)}
//       />
//       <View style={styles.pinDots} />

//       <Callout tooltip onLayout={() => setCalloutLoaded(true)}>
//         <View style={styles.popup} renderToHardwareTextureAndroid shouldRasterizeIOS>
//           <Text style={styles.popupTitle}>{place.title}</Text>
//           {place.type ? <Text style={styles.popupSub}>{place.type}</Text> : null}
//           <FastImage source={{ uri: place.image }} style={styles.popupImage} resizeMode="cover" />
//         </View>
//       </Callout>
//     </Marker>
//   );
// });

// const MapComponent = forwardRef(function PlacesMap(
//   { places, initialRegion, onMarkerPress, onMapReady },
//   ref,
// ) {
//   return (
//     <MapViewClustering
//       ref={ref}
//       style={StyleSheet.absoluteFill}
//       MapView={MapView}
//       initialRegion={initialRegion}
//       radius={Platform.select({ ios: 40, android: 50 })}
//       extent={512}
//       spiralEnabled
//       animationEnabled
//       onMapReady={() => {
//         // Parent can track readiness
//         onMapReady?.();
//         if (initialRegion) {
//           ref?.current?.animateToRegion?.(initialRegion, 400);
//         }
//       }}
//     >
//       {places?.map(p => (
//         <PhotoMarker key={p.id} place={p} onPress={onMarkerPress} />
//       ))}
//     </MapViewClustering>
//   );
// });

// export default memo(MapComponent);

// const styles = StyleSheet.create({
//   pinImage: {
//     width: scale(45),
//     height: scale(45),
//     borderRadius: scale(5),
//   },
//   pinDots: {
//     position: 'absolute',
//     top: verticalScale(-6),
//     left: scale(20),
//     width: scale(10),
//     height: scale(10),
//     borderRadius: scale(5),
//     backgroundColor: '#ff9800',
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 2,
//   },
//   popup: {
//     width: scale(240),
//     backgroundColor: '#fff',
//     borderRadius: scale(12),
//     overflow: 'hidden',
//     padding: scale(10),
//   },
//   popupTitle: {
//     fontFamily: Fonts.interBold,
//     fontSize: moderateScale(16),
//     marginBottom: verticalScale(2),
//   },
//   popupSub: { color: '#6b7280', marginBottom: verticalScale(8) },
//   popupImage: {
//     width: scale(100),
//     height: verticalScale(100),
//     borderRadius: scale(8),
//   },
// });

// const mapStyle = [
//   { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
//   { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
//   { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
//   {
//     featureType: 'water',
//     elementType: 'geometry.fill',
//     stylers: [{ color: '#a0c4ff' }],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{ color: '#ffffff' }],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [{ color: '#ffd6a5' }],
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'geometry',
//     stylers: [{ color: '#ffb5a7' }],
//   },
//   {
//     featureType: 'landscape',
//     elementType: 'geometry',
//     stylers: [{ color: '#fefae0' }],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry.fill',
//     stylers: [{ color: '#b7e4c7' }],
//   },
// ];

// MapComponent.js
import React, { memo, useMemo, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewClustering from 'react-native-map-clustering';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { Images } from '../../utils/Images';

const getCategoryTheme = category => {
  const c = (category || '').toLowerCase();

  if (c.includes('music')) return { ring: '#7c3aed', icon: Images.musicImage };
  if (c.includes('bible')) return { ring: '#22c55e', icon: Images.bibleStudyImage };
  if (c.includes('out')) return { ring: '#10b981', icon: Images.outDorsImage };
  if (c.includes('mile')) return { ring: '#0ea5e9', icon: Images.milesImage };

  return { ring: '#3b82f6', icon: Images.userIcon };
};

const PinMarker = memo(({ place, onPress }) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useMemo(() => getCategoryTheme(place?.category), [place?.category]);

  return (
    <Marker
      coordinate={{ latitude: place.lat, longitude: place.lng }}
      tracksViewChanges={!loaded}
      anchor={{ x: 0.5, y: 1 }}
      onPress={() => onPress?.(place)}
    >
      <View style={styles.pinWrap}>
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={[styles.pinBody, { backgroundColor: theme.ring }]}>
          <View style={styles.pinCircleWhite}>
            <View style={[styles.pinRing, { borderColor: theme.ring }]}>
              <Image
                source={theme.icon}
                style={styles.centerIcon}
                resizeMode="contain"
                onLoadEnd={() => setLoaded(true)}
              />
            </View>
          </View>

          <View style={[styles.pinPointer, { backgroundColor: theme.ring }]} />
        </View>
      </View>

      <Callout tooltip>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>{place.title}</Text>
          {place?.category ? <Text style={styles.popupSub}>{place.category}</Text> : null}

          {place?.image ? (
            <Image source={{ uri: place.image }} style={styles.popupImage} resizeMode="cover" />
          ) : null}
        </View>
      </Callout>
    </Marker>
  );
});

const MapComponent = forwardRef(({ places, initialRegion, onMarkerPress }, ref) => {
  return (
    <MapViewClustering
      ref={ref}
      style={StyleSheet.absoluteFill}
      MapView={MapView}
      initialRegion={initialRegion}
      radius={Platform.select({ ios: 40, android: 50 })}
      extent={512}
      spiralEnabled
      animationEnabled
    >
      {places?.map(p => (
        <PinMarker key={p.id} place={p} onPress={onMarkerPress} />
      ))}
    </MapViewClustering>
  );
});

export default memo(MapComponent);

const styles = StyleSheet.create({
  pinWrap: { alignItems: 'center' },

  dotsRow: {
    flexDirection: 'row',
    gap: scale(3),
    marginBottom: verticalScale(4),
  },
  dot: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(3),
    backgroundColor: '#f97316',
  },

  pinBody: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(6),
    borderRadius: scale(18),
    width: scale(56),
    height: scale(56),
  },

  pinCircleWhite: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pinRing: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    borderWidth: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  centerIcon: {
    width: scale(22),
    height: scale(22),
  },

  pinPointer: {
    position: 'absolute',
    bottom: verticalScale(-12),
    width: scale(16),
    height: scale(16),
    borderRadius: scale(4),
    transform: [{ rotate: '45deg' }],
  },

  popup: {
    width: scale(220),
    backgroundColor: '#fff',
    borderRadius: scale(14),
    padding: scale(10),
  },
  popupTitle: {
    fontFamily: Fonts.interBold,
    fontSize: moderateScale(15),
  },
  popupSub: {
    fontSize: moderateScale(12),
    color: '#6b7280',
    marginBottom: verticalScale(8),
  },
  popupImage: {
    width: '100%',
    height: verticalScale(110),
    borderRadius: scale(10),
  },
});
