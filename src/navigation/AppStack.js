import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenName, screen } from '../utils/NavigationKey';
import BottomTabNav from './BottomTabNav';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    // auth
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.splash}
    >
      <Stack.Screen name={screenName.splash} component={screen.SplashScreen} />
      <Stack.Screen
        name={screenName.onBoarding}
        component={screen.OnBoardingScreen}
      />
      <Stack.Screen name={screenName.signUp} component={screen.SignUpScreen} />
      <Stack.Screen name={screenName.login} component={screen.LoginScreen} />
      <Stack.Screen
        name={screenName.forgotPassword}
        component={screen.ForgotPasswordScreen}
      />
      <Stack.Screen
        name={screenName.myAccount}
        component={screen.MyAccountScreen}
      />
      {/* app */}
      <Stack.Screen name={screenName.tabStack} component={BottomTabNav} />
      <Stack.Screen
        name={screenName.termsAndPrivacy}
        component={screen.TermsAndPrivacy}
      />
      <Stack.Screen
        name={screenName.introVideo}
        component={screen.IntroVideo}
      />
      <Stack.Screen
        name={screenName.recordVideo}
        component={screen.RecordVideoScreen}
      />
      <Stack.Screen
        name={screenName.information}
        component={screen.InformationScreen}
      />
      <Stack.Screen
        name={screenName.createGathering}
        component={screen.CreateGatheringScreen}
      />
      <Stack.Screen name={screenName.filter} component={screen.FilterScreen} />
      <Stack.Screen
        name={screenName.createCommunityBoard}
        component={screen.CreateCommunityBoardScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
