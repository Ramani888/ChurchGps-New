import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screen, screenName } from '../utils/NavigationKey';
import CustomBottomTab from '../custome/CustomBottomTab';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenName.map}
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={screenName.user} component={screen.UserScreen} />
      <Tab.Screen name={screenName.map} component={screen.MapScreen} />
      <Tab.Screen name={screenName.communityBoard} component={screen.CommunityBoardScreen} />
      <Tab.Screen name={screenName.profile} component={screen.ProfileScreen} />
    </Tab.Navigator>
  );
};

export default memo(BottomTabNav);
