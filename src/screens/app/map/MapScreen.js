// import React, { useMemo, useRef, useState, memo, useCallback } from 'react';
// import { View, Image, Pressable, StyleSheet } from 'react-native';
// import { styles as mapScreenStyles } from './MapScreenStyle';
// import { Images } from '../../../utils/Images';
// import { scale } from '../../../utils/Responsive';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { screenName } from '../../../utils/NavigationKey';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MapComponent from '../../../components/showGathering/MapComponent';
// import GatheringListView from '../../../components/showGathering/GatheringListView';
// import { requestLocationPermission } from '../../../utils/ReusableFunctions';
// import { getGatheringApi } from './useMap';
// import ToastMessage from '../../../utils/ToastMessage';

// const PLACES = [
//   {
//     id: '1',
//     title: 'Statue of Unity',
//     lat: 21.8385,
//     lng: 73.7193,
//     image: 'https://statueofunityguide.in/wp-content/uploads/2021/12/Untitled-1.png',
//     type: 'statue',
//     ring: '#7c4dff',
//   },
//   {
//     id: '2',
//     title: 'shree ram mandir, ayodhya',
//     lat: 26.7956,
//     lng: 82.1944,
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLGGcDWb2HgApnvvq43higQXyHg-2LJ4qUfg&s',
//     type: 'temple',
//     ring: '#ffb300',
//   },
//   {
//     id: '3',
//     title: 'Makerspace',
//     lat: 38.997,
//     lng: -76.982,
//     image:
//       'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop',
//     type: 'workshop',
//     ring: '#4caf50',
//   },
//   {
//     id: '4',
//     title: 'Night Market',
//     lat: 38.99,
//     lng: -76.981,
//     image:
//       'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=600&auto=format&fit=crop',
//     type: 'market',
//     ring: '#3b82f6',
//   },
// ];

// const IconComponent = ({ onPress, content, customStyle }) => {
//   return (
//     <Pressable style={[mapScreenStyles.iconView, customStyle]} onPress={onPress}>
//       {content}
//     </Pressable>
//   );
// };

// const MapScreen = () => {
//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   const [selected, setSelected] = useState(null);
//   const [viewMode, setViewMode] = useState('MapView');
//   const [showSavedGathering, setShowSavedGathering] = useState(false);
//   const [gatheringData, setGatheringData] = useState([]);
//   const [isMapReady, setIsMapReady] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       requestLocationPermission();
//       setViewMode('MapView');
//       setShowSavedGathering(false);
//       getGatheringData();
//     }, []),
//   );

//   const getGatheringData = useCallback(async () => {
//     try {
//       const response = await getGatheringApi();
//       console.log('get gathering data', response);
//       if (response?.success) {
//         setGatheringData(response?.data);
//       }
//     } catch (error) {
//       ToastMessage(error?.message);
//       console.log('error in get gathering api', error);
//     }
//   }, []);

//   const firstPlaceRegion = useMemo(() => {
//     const p = PLACES[0];
//     if (!p)
//       return {
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 60,
//         longitudeDelta: 60,
//       };
//     return {
//       latitude: p.lat,
//       longitude: p.lng,
//       latitudeDelta: 0.15,
//       longitudeDelta: 0.15,
//     };
//   }, []);

//   const initialRegion = firstPlaceRegion;

//   const toggleMapList = () => {
//     setViewMode(prev => (prev === 'MapView' ? 'ListView' : 'MapView'));
//     if (viewMode === 'ListView') {
//       setShowSavedGathering(false);
//     }
//   };

//   const showSavedList = () => {
//     setShowSavedGathering(prev => !prev);
//     setViewMode('ListView');
//   };

//   return (
//     <SafeAreaView style={mapScreenStyles.container}>
//       <View style={{ flex: 1 }}>
//         {viewMode === 'MapView' ? (
//           <MapComponent
//             ref={mapRef}
//             places={PLACES}
//             initialRegion={initialRegion}
//             onMarkerPress={setSelected}
//             onMapReady={() => setIsMapReady(true)}
//           />
//         ) : (
//           <GatheringListView showSavedGathering={showSavedGathering} />
//         )}
//       </View>

//       <View style={mapScreenStyles.iconContainer}>
//         <IconComponent
//           onPress={toggleMapList}
//           content={
//             viewMode === 'MapView' ? (
//               <Image source={Images.lsitViewIcon} style={mapScreenStyles.icon} />
//             ) : (
//               <Image source={Images.mapViewIcon} style={mapScreenStyles.icon} />
//             )
//           }
//         />

//         <IconComponent
//           onPress={showSavedList}
//           content={<Image source={Images.unsavedIcon} style={mapScreenStyles.icon} />}
//           customStyle={{ marginRight: scale(110) }}
//         />

//         <IconComponent
//           onPress={() => navigation.navigate(screenName.information)}
//           content={<Image source={Images.infoIcon} style={mapScreenStyles.icon} />}
//         />
//         <IconComponent
//           onPress={() => navigation.navigate(screenName.createGathering)}
//           content={<Image source={Images.createIcon} style={mapScreenStyles.icon} />}
//         />
//         <IconComponent
//           onPress={() => navigation.navigate(screenName.filter)}
//           content={<Image source={Images.filterIcon} style={mapScreenStyles.icon} />}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default memo(MapScreen);

// MapScreen.js
import React, { useMemo, useRef, useState, memo, useCallback } from 'react';
import { View, Image } from 'react-native';
import { styles as mapScreenStyles } from './MapScreenStyle';
import { Images } from '../../../utils/Images';
import { scale } from '../../../utils/Responsive';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/NavigationKey';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapComponent from '../../../components/showGathering/MapComponent';
import GatheringListView from '../../../components/showGathering/GatheringListView';
import { requestLocationPermission } from '../../../utils/ReusableFunctions';
import { getGatheringApi } from './useMap';
import ToastMessage from '../../../utils/ToastMessage';

const IconComponent = ({ onPress, content, customStyle }) => (
  <View style={[mapScreenStyles.iconView, customStyle]} onTouchEnd={onPress}>
    {content}
  </View>
);

const MapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [viewMode, setViewMode] = useState('MapView');
  const [showSavedGathering, setShowSavedGathering] = useState(false);
  const [gatheringData, setGatheringData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      requestLocationPermission();
      setViewMode('MapView');
      setShowSavedGathering(false);
      getGatheringData();
    }, []),
  );

  const getGatheringData = useCallback(async () => {
    try {
      const response = await getGatheringApi();
      if (response?.success) {
        setGatheringData(response?.data || []);
      }
    } catch (error) {
      ToastMessage(error?.message);
      console.log('error in get gathering api', error);
    }
  }, []);

  // ✅ API → Map places
  const placesFromApi = useMemo(() => {
    const data = gatheringData || [];

    const mapped = data
      .filter(item => item?.coordinates?.latitude && item?.coordinates?.longitude)
      .map(item => ({
        id: item?._id,
        title: item?.groupName || 'Gathering',
        lat: Number(item?.coordinates?.latitude),
        lng: Number(item?.coordinates?.longitude),
        category: item?.primaryCategory || item?.categories?.[0] || 'Other',
        categories: item?.categories || [],
        locationTypes: item?.locationTypes || [],
        isSaved: !!item?.isSaved,
        radius: item?.radius || 0,
        image: item?.groupPicture || '',
        raw: item,
      }));

    return showSavedGathering ? mapped.filter(p => p.isSaved) : mapped;
  }, [gatheringData, showSavedGathering]);

  const initialRegion = useMemo(() => {
    const p = placesFromApi?.[0];
    if (!p) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 60,
        longitudeDelta: 60,
      };
    }
    return {
      latitude: p.lat,
      longitude: p.lng,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    };
  }, [placesFromApi]);

  const toggleMapList = () => {
    setViewMode(prev => (prev === 'MapView' ? 'ListView' : 'MapView'));
    if (viewMode === 'ListView') setShowSavedGathering(false);
  };

  const showSavedList = () => {
    setShowSavedGathering(true);
    setViewMode('ListView');
  };

  return (
    <SafeAreaView style={mapScreenStyles.container}>
      <View style={{ flex: 1 }}>
        {viewMode === 'MapView' ? (
          <MapComponent
            ref={mapRef}
            places={placesFromApi}
            initialRegion={initialRegion}
            onMarkerPress={place => {
              console.log('marker pressed', place?.raw);
            }}
          />
        ) : (
          <GatheringListView
            gatheringData={gatheringData}
            showSavedGathering={showSavedGathering}
          />
        )}
      </View>

      <View style={mapScreenStyles.iconContainer}>
        <IconComponent
          onPress={toggleMapList}
          content={
            viewMode === 'MapView' ? (
              <Image source={Images.lsitViewIcon} style={mapScreenStyles.icon} />
            ) : (
              <Image source={Images.mapViewIcon} style={mapScreenStyles.icon} />
            )
          }
        />

        <IconComponent
          onPress={showSavedList}
          content={
            <Image
              source={showSavedGathering ? Images.savedAllIcon : Images.unsavedIcon}
              style={mapScreenStyles.icon}
            />
          }
          customStyle={{ marginRight: scale(110) }}
        />

        <IconComponent
          onPress={() => navigation.navigate(screenName.information)}
          content={<Image source={Images.infoIcon} style={mapScreenStyles.icon} />}
        />

        <IconComponent
          onPress={() => navigation.navigate(screenName.createGathering)}
          content={<Image source={Images.createIcon} style={mapScreenStyles.icon} />}
        />

        <IconComponent
          onPress={() => navigation.navigate(screenName.filter)}
          content={<Image source={Images.filterIcon} style={mapScreenStyles.icon} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(MapScreen);
