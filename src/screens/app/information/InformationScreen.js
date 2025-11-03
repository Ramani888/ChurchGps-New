import { Text, View } from 'react-native';
import React, { memo } from 'react';
import { styles } from './InformationScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

const InformationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>InformationScreen</Text>
    </SafeAreaView>
  );
};

export default memo(InformationScreen);
