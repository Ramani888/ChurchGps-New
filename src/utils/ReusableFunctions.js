// // locationHelper.js
// import { Alert, Keyboard, Platform } from 'react-native';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
// } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';

// export const keyboardDismiss = () => Keyboard.dismiss();

// const showLocationSettingsAlert = () => {
//   Alert.alert(
//     'Enable Location Permission',
//     'You have permanently disabled location permission. Please enable it from settings.',
//     [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Open Settings', onPress: () => openSettings() },
//     ],
//   );
// };

// const getLocationPermissionConst = () =>
//   Platform.select({
//     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//     default: null,
//   });

// export const requestLocationPermission = async () => {
//   try {
//     const permission = getLocationPermissionConst();
//     if (!permission) {
//       return false;
//     }

//     // 1) Check current status first
//     const currentStatus = await check(permission);

//     if (currentStatus === RESULTS.GRANTED) {
//       console.log('Location permission already granted');
//       return true;
//     }

//     if (currentStatus === RESULTS.BLOCKED) {
//       console.log('Location permission is blocked');
//       showLocationSettingsAlert();
//       return false;
//     }

//     // 2) Not granted yet → request it
//     const result = await request(permission);

//     switch (result) {
//       case RESULTS.GRANTED:
//         console.log('Location permission granted');
//         return true;

//       case RESULTS.DENIED:
//         console.log('Location permission denied by user');
//         return false;

//       case RESULTS.BLOCKED:
//         console.log('Location permission blocked after request');
//         showLocationSettingsAlert();
//         return false;

//       default:
//         return false;
//     }
//   } catch (err) {
//     console.warn('Error requesting location permission:', err);
//     return false;
//   }
// };

// export const getCurrentLocation = async (options = {}) => {
//   const hasPermission = await requestLocationPermission();
//   if (!hasPermission) {
//     return null;
//   }

//   const defaultOptions = {
//     enableHighAccuracy: true,
//     timeout: 15000,
//     maximumAge: 10000,
//   };

//   const finalOptions = { ...defaultOptions, ...options };

//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         // console.log('Lat:', latitude, 'Lng:', longitude);
//         resolve({ latitude, longitude, position });
//       },
//       error => {
//         console.log('Error getting location:', error);
//         Alert.alert('Error', 'Unable to fetch location.');
//         reject(error);
//       },
//       finalOptions,
//     );
//   });
// };

// locationHelper.js
import { Alert, Keyboard, Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const keyboardDismiss = () => Keyboard.dismiss();

/**
 * Alert when permission is permanently blocked.
 */
const showLocationSettingsAlert = () => {
  Alert.alert(
    'Enable Location Permission',
    'Location permission is blocked. Please enable it from app settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ],
  );
};

/**
 * Get platform-specific permission constant.
 */
const getLocationPermissionConst = () =>
  Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    default: null,
  });

/**
 * Request location permission (Android & iOS).
 * Returns true if permission is granted, otherwise false.
 */
export const requestLocationPermission = async () => {
  try {
    const permission = getLocationPermissionConst();
    if (!permission) {
      console.warn('No permission constant for this platform');
      return false;
    }

    // 1) Check current status first
    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.GRANTED) {
      console.log('Location permission already granted');
      return true;
    }

    if (currentStatus === RESULTS.BLOCKED) {
      console.log('Location permission is blocked');
      showLocationSettingsAlert();
      return false;
    }

    // 2) Not granted yet → request it
    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        console.log('Location permission granted');
        return true;

      case RESULTS.DENIED:
        console.log('Location permission denied by user');
        return false;

      case RESULTS.BLOCKED:
        console.log('Location permission blocked after request');
        showLocationSettingsAlert();
        return false;

      case RESULTS.LIMITED:
        console.log('Location permission limited (iOS)');
        // Treat limited as allowed for foreground use
        return true;

      default:
        console.log('Location permission result:', result);
        return false;
    }
  } catch (err) {
    console.warn('Error requesting location permission:', err);
    return false;
  }
};
