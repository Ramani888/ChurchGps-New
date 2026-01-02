import CommunityBoardScreen from '../screens/app/communityBoardScreen/CommunityBoardScreen';
import CreateCommunityBoardScreen from '../screens/app/createCommunityBoard/CreateCommunityBoardScreen';
import CreateGatheringScreen from '../screens/app/createGathering/CreateGatheringScreen';
import FilterScreen from '../screens/app/filter/FilterScreen';
import FriendsScreen from '../screens/app/message/friendsScreen/FriendsScreen';
import InformationScreen from '../screens/app/information/InformationScreen';
import IntroVideo from '../screens/app/introVideo/IntroVideo';
import MapScreen from '../screens/app/map/MapScreen';
import Chatscreen from '../screens/app/message/chat/Chatscreen';
import UserScreen from '../screens/app/message/user/UserScreen';
import ProfileScreen from '../screens/app/profile/ProfileScreen';
import RecordVideoScreen from '../screens/app/recordVideo/RecordVideoScreen';
import TermsAndPrivacy from '../screens/app/termsAndPrivacy/TermsAndPrivacy';
import ForgotPasswordScreen from '../screens/auth/forgotPassword/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import MyAccountScreen from '../screens/app/myAccount/MyAccountScreen';
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
  information: 'Information',
  createGathering: 'CreateGathering',
  filter: 'Filter',
  createCommunityBoard: 'CreateCommunityBoard',
  friendsScreen: 'FriendsScreen',
  chatScreen: 'ChatScreen',

  // TabScreen
  user: 'User',
  map: 'Map',
  communityBoard: 'CommunityBoard',
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
  InformationScreen,
  CreateGatheringScreen,
  FilterScreen,
  CreateCommunityBoardScreen,
  FriendsScreen,
  Chatscreen,

  // Tabscreen
  UserScreen,
  MapScreen,
  CommunityBoardScreen,
  ProfileScreen,
};
