// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
// import { scale, verticalScale } from '../utils/Responsive';
// import Color from '../utils/Color';

// const LocationPreview = ({ latitude, longitude }) => {
//   //   const latitude = 39.0205;
//   //   const longitude = -76.9818;

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         customMapStyle={greyMapStyle} // identical grayscale look
//         scrollEnabled={false}
//         zoomEnabled={false}
//         rotateEnabled={false}
//         pitchEnabled={false}
//       >
//         {/* Blue Dot */}
//         <Marker coordinate={{ latitude, longitude }} anchor={{ x: 0.5, y: 0.5 }}>
//           <View style={styles.dotOuter}>
//             <View style={styles.dotInner} />
//           </View>
//         </Marker>

//         {/* Radius Circle */}
//         <Circle
//           center={{ latitude, longitude }}
//           radius={scale(350)}
//           strokeWidth={2}
//           strokeColor="rgba(33, 150, 243, 0.9)"
//           fillColor="rgba(33, 150, 243, 0.25)"
//         />
//       </MapView>
//     </View>
//   );
// };

// export default LocationPreview;

// const styles = StyleSheet.create({
//   container: {
//     width: scale(319),
//     height: verticalScale(140),
//     borderRadius: scale(16),
//     overflow: 'hidden',
//   },
//   map: {
//     flex: 1,
//   },
//   dotOuter: {
//     width: scale(20),
//     height: scale(20),
//     borderRadius: scale(10),
//     backgroundColor: Color.White,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dotInner: {
//     width: scale(10),
//     height: scale(10),
//     borderRadius: scale(5),
//     backgroundColor: '#2a73ff',
//   },
// });

// const greyMapStyle = [
//   // Base map geometry
//   {
//     elementType: 'geometry',
//     stylers: [{ color: '#D2D3D2' }], // main background (matches first image)
//   },
//   // Labels
//   {
//     elementType: 'labels.text.fill',
//     stylers: [{ color: 'darkgray' }],
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [{ color: '#D2D3D2' }],
//   },
//   // Disable POIs for clean look
//   {
//     featureType: 'poi',
//     stylers: [{ visibility: 'off' }],
//   },
//   // Roads
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{ color: Color.White }], // LIGHT GREY road (not pure white)
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [{ color: Color.Gray }], // subtle edges
//   },
//   // Water
//   {
//     featureType: 'water',
//     stylers: [{ color: Color.Gray }], // exact muted blue
//   },
// ];

// // Greyscale custom style like your image
// // const greyMapStyle = [
// //   {
// //     elementType: 'geometry',
// //     stylers: [{ color: '#ebecee' }],
// //   },
// //   {
// //     elementType: 'labels.text.fill',
// //     stylers: [{ color: '#616161' }],
// //   },
// //   {
// //     elementType: 'labels.text.stroke',
// //     stylers: [{ color: '#f5f5f5' }],
// //   },
// //   {
// //     featureType: 'poi',
// //     stylers: [{ visibility: 'off' }],
// //   },
// //   {
// //     featureType: 'road',
// //     elementType: 'geometry',
// //     stylers: [{ color: '#ffffff' }],
// //   },
// //   {
// //     featureType: 'water',
// //     stylers: [{ color: '#c9c9c9' }],
// //   },
// // ];

import React, { memo, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { scale, verticalScale } from '../utils/Responsive';
import Color from '../utils/Color';

const LocationPreview = ({ latitude, longitude, containerStyle }) => {
  const isValid =
    typeof latitude === 'number' &&
    !Number.isNaN(latitude) &&
    typeof longitude === 'number' &&
    !Number.isNaN(longitude);

  if (!isValid) {
    // If no valid coordinates, render nothing (or a fallback view if you want)
    return null;
  }

  const region = useMemo(
    () => ({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
    [latitude, longitude],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        customMapStyle={greyMapStyle}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        <Marker coordinate={{ latitude, longitude }} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.dotOuter}>
            <View style={styles.dotInner} />
          </View>
        </Marker>

        <Circle
          center={{ latitude, longitude }}
          radius={350}
          strokeWidth={2}
          strokeColor="rgba(33, 150, 243, 0.9)"
          fillColor="rgba(33, 150, 243, 0.25)"
        />
      </MapView>
    </View>
  );
};

export default memo(LocationPreview);

const styles = StyleSheet.create({
  container: {
    width: scale(322),
    height: verticalScale(140),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  dotOuter: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: Color.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#2a73ff',
  },
});

const greyMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#D2D3D2' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: 'darkgray' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#D2D3D2' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: Color.White }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: Color.Gray }],
  },
  {
    featureType: 'water',
    stylers: [{ color: Color.Gray }],
  },
];
