// import React, { memo, forwardRef, useState } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import MapViewClustering from 'react-native-map-clustering';
// import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
// import { Fonts } from '../../utils/Font';
// import FastImage from 'react-native-fast-image';

// // const mapStyle = [
// //   { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
// //   { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
// //   { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
// //   {
// //     featureType: 'water',
// //     elementType: 'geometry.fill',
// //     stylers: [{ color: '#a0c4ff' }],
// //   },
// //   {
// //     featureType: 'road',
// //     elementType: 'geometry',
// //     stylers: [{ color: '#ffffff' }],
// //   },
// //   {
// //     featureType: 'road.highway',
// //     elementType: 'geometry',
// //     stylers: [{ color: '#ffd6a5' }],
// //   },
// //   {
// //     featureType: 'road.arterial',
// //     elementType: 'geometry',
// //     stylers: [{ color: '#ffb5a7' }],
// //   },
// //   {
// //     featureType: 'landscape',
// //     elementType: 'geometry',
// //     stylers: [{ color: '#fefae0' }],
// //   },
// //   {
// //     featureType: 'poi.park',
// //     elementType: 'geometry.fill',
// //     stylers: [{ color: '#b7e4c7' }],
// //   },
// // ];

// const PhotoMarker = memo(function PhotoMarker({ place, onPress, styles }) {
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
//         source={{
//           uri: place.image,
//         }}
//         style={styles.pinImage}
//       />
//       <View style={styles.pinDots} />

//       <Callout tooltip>
//         <View
//           style={styles.popup}
//           renderToHardwareTextureAndroid
//           shouldRasterizeIOS
//         >
//           <Text style={styles.popupTitle}>{place.title}</Text>
//           {place.type ? (
//             <Text style={styles.popupSub}>{place.type}</Text>
//           ) : null}
//           <FastImage
//             source={{ uri: place.image }}
//             style={styles.popupImage}
//             resizeMode="cover"
//           />
//         </View>
//       </Callout>
//     </Marker>
//   );
// });

// const MapComponent = forwardRef(function PlacesMap(
//   { places, initialRegion, onMarkerPress },
//   ref,
// ) {
//   return (
//     <MapViewClustering
//       ref={ref}
//       style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
//       MapView={MapView}
//       initialRegion={initialRegion}
//       radius={Platform.select({ ios: 40, android: 50 })}
//       extent={512}
//       spiralEnabled
//       animationEnabled
//       // customMapStyle={mapStyle}
//       onMapReady={() => {
//         if (initialRegion) {
//           ref?.current?.animateToRegion?.(initialRegion, 400);
//         }
//       }}
//     >
//       {places?.map(p => (
//         <PhotoMarker
//           key={p.id}
//           place={p}
//           onPress={onMarkerPress}
//           styles={styles}
//         />
//       ))}
//     </MapViewClustering>
//   );
// });

// export default memo(MapComponent);

// const styles = StyleSheet.create({
//   pin: {
//     width: scale(50),
//     height: scale(50),
//     borderRadius: scale(25),
//     borderWidth: 4,
//     overflow: 'hidden',
//     backgroundColor: '#ddd',
//     shadowColor: '#000',
//     shadowOpacity: scale(0.3),
//     shadowRadius: scale(4),
//     shadowOffset: { width: 0, height: 2 },
//     elevation: scale(5),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pinImage: { width: scale(45), height: scale(45), borderRadius: scale(5) },
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

// MapComponent.tsx
import React, { memo, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewClustering from 'react-native-map-clustering';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import FastImage from 'react-native-fast-image';

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
      <FastImage
        source={{ uri: place.image }}
        style={styles.pinImage}
        onLoad={() => setPinLoaded(true)}
      />
      <View style={styles.pinDots} />

      <Callout tooltip onLayout={() => setCalloutLoaded(true)}>
        <View style={styles.popup} renderToHardwareTextureAndroid shouldRasterizeIOS>
          <Text style={styles.popupTitle}>{place.title}</Text>
          {place.type ? <Text style={styles.popupSub}>{place.type}</Text> : null}
          <FastImage source={{ uri: place.image }} style={styles.popupImage} resizeMode="cover" />
        </View>
      </Callout>
    </Marker>
  );
});

const MapComponent = forwardRef(function PlacesMap(
  { places, initialRegion, onMarkerPress, onMapReady },
  ref,
) {
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
      onMapReady={() => {
        // Parent can track readiness
        onMapReady?.();
        if (initialRegion) {
          ref?.current?.animateToRegion?.(initialRegion, 400);
        }
      }}
    >
      {places?.map(p => (
        <PhotoMarker key={p.id} place={p} onPress={onMarkerPress} />
      ))}
    </MapViewClustering>
  );
});

export default memo(MapComponent);

const styles = StyleSheet.create({
  pinImage: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(5),
  },
  pinDots: {
    position: 'absolute',
    top: verticalScale(-6),
    left: scale(20),
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#ff9800',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  popup: {
    width: scale(240),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    overflow: 'hidden',
    padding: scale(10),
  },
  popupTitle: {
    fontFamily: Fonts.interBold,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(2),
  },
  popupSub: { color: '#6b7280', marginBottom: verticalScale(8) },
  popupImage: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: scale(8),
  },
});
