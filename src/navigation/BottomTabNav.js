import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screen, screenName } from '../utils/NavigationKey';
import CustomBottomTab from '../custome/CustomBottomTab';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenName.profile}
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={screenName.message} component={screen.MessageScreen} />
      <Tab.Screen name={screenName.search} component={screen.SearchScreen} />
      <Tab.Screen
        name={screenName.dashBoard}
        component={screen.DashBoardScreen}
      />
      <Tab.Screen name={screenName.profile} component={screen.ProfileScreen} />
    </Tab.Navigator>
  );
};

export default memo(BottomTabNav);
