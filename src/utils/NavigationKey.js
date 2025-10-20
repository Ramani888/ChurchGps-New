import DashBoardScreen from '../screens/app/dashboard/DashBoardScreen';
import IntroVideo from '../screens/app/introVideo/IntroVideo';
import MessageScreen from '../screens/app/message/MessageScreen';
import ProfileScreen from '../screens/app/profile/ProfileScreen';
import RecordVideoScreen from '../screens/app/recordVideo/RecordVideoScreen';
import SearchScreen from '../screens/app/search/SearchScreen';
import TermsAndPrivacy from '../screens/app/termsAndPrivacy/TermsAndPrivacy';
import ForgotPasswordScreen from '../screens/auth/forgotPassword/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import MyAccountScreen from '../screens/auth/myAccount/MyAccountScreen';
import OnBoardingScreen from '../screens/auth/onboarding/OnBoardingScreen';
import SignUpScreen from '../screens/auth/signup/SignUpScreen';
import SplashScreen from '../screens/auth/SplashScreen';

export const screenName = {
  // auth
  splash: 'Splash',
  onBoarding: 'OnBoarding',
  signUp: 'SignUp',
  login: 'Login',
  forgotPassword: 'ForgotPassword',
  myAccount: 'MyAccount',

  // app
  tabStack: 'TabStack',
  termsAndPrivacy: 'TermsAndPrivacy',
  introVideo: 'IntroVideo',
  recordVideo: 'RecordVideo',

  // TabScreen
  message: 'Message',
  search: 'Search',
  dashBoard: 'DashBoard',
  profile: 'Profile',
};

export const screen = {
  // auth
  SplashScreen,
  OnBoardingScreen,
  SignUpScreen,
  LoginScreen,
  ForgotPasswordScreen,
  MyAccountScreen,

  // app
  TermsAndPrivacy,
  IntroVideo,
  RecordVideoScreen,

  // Tabscreen
  MessageScreen,
  SearchScreen,
  DashBoardScreen,
  ProfileScreen,
};
