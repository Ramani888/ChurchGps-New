import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 800,
  maxWidth: 800,
  quality: 0.8,
  cameraType: 'front',
};

export const handleCamera = async onselectFile => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Camera permission denied');
        return;
      }
    }

    const result = await launchCamera(options);

    if (!result.didCancel && result.assets?.length > 0) {
      const selectedAsset = result.assets[0];

      const file = {
        uri: selectedAsset.uri,
        type: selectedAsset.type,
        name: selectedAsset.fileName,
      };
      onselectFile(file);
    }
  } catch (error) {
    console.log('Camera Error:', error);
  }
};

export const handleGallery = async onselectFile => {
  try {
    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets?.length > 0) {
      const selectedAsset = result.assets[0];

      const file = {
        uri: selectedAsset.uri,
        type: selectedAsset.type,
        name: selectedAsset.fileName,
      };
      onselectFile(file);
    }
  } catch (error) {
    console.log('error in select from gallery', error);
  }
};

// const handleGallery = async () => {
//   try {
//     const result = await pick({
//       type: [types.allFiles], // You can restrict if needed
//     });
//     onFileSelected(result);
//   } catch (error) {
//     if (isCancel(error)) {
//       console.log('Gallery picker cancelled');
//     } else {
//       console.error('Gallery Picker Error:', error);
//     }
//   } finally {
//     PickerSheetRef.current?.hide();
//   }
// };
