import { Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateGatheringScreenStyle';

const CreateGatheringScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CreateGatheringScreen</Text>
    </SafeAreaView>
  );
};

export default memo(CreateGatheringScreen);
