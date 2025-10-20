import React, { memo, useCallback, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/NavigationKey';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

const SplashScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  const checkLoggedIn = useCallback(async () => {
    try {
      const entries = await AsyncStorage.multiGet(['TOKEN', 'USER']);
      const token = entries.find(([k]) => k === 'TOKEN')?.[1] || '';
      const userRaw = entries.find(([k]) => k === 'USER')?.[1] || '';

      let user = null;
      try {
        user = userRaw ? JSON.parse(userRaw) : null;
      } catch {
        user = null;
      }

      global.token = token || '';

      let accountSetupComplete = 'false';
      const userId = user?._id;

      if (userId != null) {
        accountSetupComplete = await AsyncStorage.getItem(
          `SETUP_ACCOUNT_${userId}`,
        );

        if (accountSetupComplete === 'true') {
          LottieSplashScreen.hide();
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: screenName.tabStack }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: screenName.onBoarding }],
            });
          }
        } else {
          LottieSplashScreen.hide();
          navigation.reset({
            index: 0,
            routes: [{ name: screenName.myAccount }],
          });
        }
      } else {
        LottieSplashScreen.hide();
        navigation.reset({
          index: 0,
          routes: [{ name: screenName.onBoarding }],
        });
      }
    } catch (error) {
      console.log('error in checkLoggedIn', error);
      // Fallback: hide splash and send to onboarding
      try {
        await LottieSplashScreen.hide();
      } catch {}
      navigation.reset({
        index: 0,
        routes: [{ name: screenName.onBoarding }],
      });
    }
  }, [navigation]);

  return;
};

export default memo(SplashScreen);
