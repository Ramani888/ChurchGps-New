import { apiGet } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const getCommunityPostApi = async (latitude, longitude) => {
  console.log('lat', latitude);
  console.log('long', longitude);
  return apiGet(`${Api.community}?lat=${latitude}&lng=${longitude}`);
};

// import { FlatList, Image, Pressable, Text, View } from 'react-native';
// import React, { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { styles } from './CommunityBoardScreenStyle';
// import CustomHeader from '../../../custome/CustomHeader';
// import { strings } from '../../../language/strings';
// import { scale, verticalScale } from '../../../utils/Responsive';
// import { useNavigation } from '@react-navigation/native';
// import { screenName } from '../../../utils/NavigationKey';
// import { Images } from '../../../utils/Images';
// import Color from '../../../utils/Color';
// import CustomBottomsheet from '../../../custome/CustomBottomsheet';
// import CommunityBoardInformationContent from '../../../components/bottomSheetContent/CommunityBoardInformationContent';
// import { BlurView } from '@react-native-community/blur';
// import { getCommunityPostApi } from './useCommunity';
// import Geolocation from '@react-native-community/geolocation';
// import { formatDateTime, requestLocationPermission } from '../../../utils/ReusableFunctions';
// import Loader from '../../../utils/Loader';

// const CommunityBoardScreen = () => {
//   const navigation = useNavigation();
//   const sheetRef = useRef();

//   const [visible, setVisible] = useState(false);
//   const [blurVisible, setBlurVisible] = useState(false);
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setlongitude] = useState('');
//   const [communityPostData, setCommunityPostData] = useState([]);

//   useLayoutEffect(() => {
//     getCurrentLocation();
//   }, []);

//   // ========================================== Api =========================================== //

//   const getCoomunityDataApi = useCallback(async (latitude, longitude) => {
//     try {
//       const response = await getCommunityPostApi(latitude, longitude);
//       if (response?.success) {
//         setCommunityPostData(response?.data);
//       }
//     } catch (error) {
//       console.log('error in get community post data', error);
//     }
//   }, []);

//   // ========================================= End =========================================== //

//   const openBottomsheet = useCallback(() => {
//     sheetRef.current.show();
//   }, []);

//   const closeBottomsheet = useCallback(() => {
//     sheetRef.current.hide();
//   }, []);

//   const getCurrentLocation = useCallback(async () => {
//     try {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         Alert.alert(
//           'Permission Required',
//           'Location permission is required to get your current location.',
//         );
//         return null;
//       }
//       if (hasPermission) {
//         setVisible(true);
//         Geolocation.getCurrentPosition(position => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setlongitude(longitude);
//           getCoomunityDataApi(latitude, longitude);
//         });
//       }
//     } catch (error) {
//       console.log('error in get current location', error);
//     } finally {
//       setVisible(false);
//     }
//   }, []);

//   const renderList = useCallback(({ item, index }) => {
//     return (
//       <View>
//         <View style={styles.listContainer}>
//           <Image source={{ uri: item?.userData?.profileUrl }} style={styles.profileImage} />
//           <View>
//             <View style={styles.firstlineView}>
//               <Text style={styles.titleStyle}>{item?.username}</Text>
//               <Text style={[styles.textStyle, { color: Color.Gray }]}>
//                 {formatDateTime(item?.createdAt)}
//               </Text>
//               <Pressable onPress={() => {}}>
//                 <Image source={Images.threedotCircleImage} style={styles.image} />
//               </Pressable>
//             </View>
//             <Text style={[styles.textStyle, styles.desc]}>{item?.description}</Text>
//             <View style={styles.distanceView}>
//               <Image source={Images.locationIconImage} style={styles.image} />
//               <Text style={[styles.textStyle, { color: Color.Black }]}>
//                 {item?.distance} {strings.mile}
//               </Text>
//             </View>
//           </View>
//         </View>
//         {communityPostData?.length !== index + 1 && <View style={styles.devider} />}
//       </View>
//     );
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Loader visible={visible} />
//       <CustomHeader
//         backArrowVisible
//         gradientTitle={strings.communityBoard}
//         titleFontSize={scale(31)}
//         infoIcon={Images.infoIcon}
//         infoIconPress={() => openBottomsheet()}
//       />

//       <View>
//         <FlatList
//           data={communityPostData}
//           renderItem={renderList}
//           contentContainerStyle={styles.flatlistView}
//         />
//       </View>

//       <Pressable
//         style={styles.fabButton}
//         onPress={() =>
//           navigation.navigate(screenName.createCommunityBoard, {
//             latitude: latitude,
//             longitude: longitude,
//           })
//         }
//       >
//         <Image source={Images.plusFabIcon} style={styles.fabIcon} />
//       </Pressable>

//       {blurVisible && (
//         <BlurView
//           style={styles.absolute}
//           blurType="light"
//           blurAmount={4}
//           reducedTransparencyFallbackColor="white"
//         />
//       )}

//       <CustomBottomsheet ref={sheetRef} setBlurVisible={setBlurVisible}>
//         <CommunityBoardInformationContent closeBottomsheet={closeBottomsheet} />
//       </CustomBottomsheet>
//     </SafeAreaView>
//   );
// };

// export default memo(CommunityBoardScreen);
