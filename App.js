import 'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import AppNav from './src/navigation/AppNav';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import Color from './src/utils/Color';
import AppProvider from './src/context/AppProvider';
import { SocketProvider } from './src/context/SocketContext';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { flushQueue, navigationRef } from './src/navigation/NavigationService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureGoogleSignIn } from './src/config/googleSignIn';
import { MenuProvider } from 'react-native-popup-menu';

const Main = () => {
  return (
    <SocketProvider>
      <GestureHandlerRootView>
        <MenuProvider>
          <AppNav />
        </MenuProvider>
      </GestureHandlerRootView>
    </SocketProvider>
  );
};

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const errorHandler = (error, stackTrace) => {
    console.log('Logged error:', error);
    console.log('stackTrace', stackTrace);
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardProvider>
        <NavigationContainer ref={navigationRef} onReady={flushQueue}>
          <AppProvider>
            <Main />
          </AppProvider>
        </NavigationContainer>
      </KeyboardProvider>
    </ErrorBoundary>
  );
};

export default App;

const styles = StyleSheet.create({});
