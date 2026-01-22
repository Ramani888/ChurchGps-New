import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalenderScreen = () => {
  return (
    <SafeAreaView>
      <Text>CalenderScreen</Text>
    </SafeAreaView>
  );
};

export default memo(CalenderScreen);
