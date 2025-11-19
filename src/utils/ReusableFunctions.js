import { Alert, Keyboard, Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const keyboardDismiss = () => Keyboard.dismiss();

// ============================================= Location ============================================ //

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

const getLocationPermissionConst = () =>
  Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    default: null,
  });

export const requestLocationPermission = async () => {
  try {
    const permission = getLocationPermissionConst();
    if (!permission) {
      console.warn('No permission constant for this platform');
      return false;
    }

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

// ======================================= Image Picker ======================================= //

const defaultOptions = {
  mediaType: 'photo',
  quality: 0.8,
  includeBase64: false,
};

export const selectFromCamera = async onSelect => {
  try {
    const result = await launchCamera(defaultOptions);

    if (result.didCancel) return null;
    if (result.errorCode) {
      Alert.alert('Camera Error', result.errorMessage);
      return null;
    }

    const data = result.assets[0];

    const file = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };
    onSelect(file);
  } catch (err) {
    console.log('pickFromCamera error:', err);
    return null;
  }
};

export const selectFromGallery = async onSelect => {
  try {
    const result = await launchImageLibrary(defaultOptions);

    if (result.didCancel) return null;
    if (result.errorCode) {
      Alert.alert('Camera Error', result.errorMessage);
      return null;
    }

    const data = result.assets[0];

    const file = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };
    onSelect(file);
  } catch (err) {
    console.log('pickFromGallery error:', err);
    return null;
  }
};
