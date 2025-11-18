import { Alert, Keyboard, Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const keyboardDismiss = () => Keyboard.dismiss();

const customelocationPermissionPopup = () => {
  Alert.alert(
    'Enable Location Permission',
    'You have permanently disabled location permission. Please enable it from settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ],
  );
};

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      switch (result) {
        case RESULTS.GRANTED:
          console.log('Location permission granted');
          return true;

        case RESULTS.DENIED:
          console.log('Location permission denied');
          return false;

        case RESULTS.BLOCKED:
          customelocationPermissionPopup();
          console.log('Permission blocked. User must enable in settings.');
          return false;
      }
    }

    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
