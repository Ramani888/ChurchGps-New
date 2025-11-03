import { Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './FilterScreenStyles';

const FilterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FilterScreen</Text>
    </SafeAreaView>
  );
};

export default memo(FilterScreen);
