import { ToastAndroid, Platform, Alert } from 'react-native';

const ToastMessage = message => {
  if (message && message.trim().length > 0) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('', message);
    }
  } else {
    console.error('Message is empty or null');
  }
};

export default ToastMessage;
