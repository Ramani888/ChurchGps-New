import 'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import AppNav from './src/navigation/AppNav';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import Color from './src/utils/Color';
import AppProvider from './src/context/AppProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { flushQueue, navigationRef } from './src/navigation/NavigationService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureGoogleSignIn } from './src/config/googleSignIn';
import FriendsScreen from './src/screens/app/friendsScreen/FriendsScreen';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

const App = () => {
  useEffect(() => {
    // Initialize Google Sign-In configuration on app start
    configureGoogleSignIn();
    LottieSplashScreen.hide();
  }, []);

  const errorHandler = (error, stackTrace) => {
    console.log('Logged error:', error);
    console.log('stackTrace', stackTrace);
    // send to Sentry, Firebase, etc.
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardProvider>
        <NavigationContainer ref={navigationRef} onReady={flushQueue}>
          <AppProvider>
            <GestureHandlerRootView>
              <AppNav />
            </GestureHandlerRootView>
          </AppProvider>
        </NavigationContainer>
      </KeyboardProvider>
    </ErrorBoundary>
  );
};

export default App;

const styles = StyleSheet.create({});
