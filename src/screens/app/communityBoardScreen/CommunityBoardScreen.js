import { Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CommunityBoardScreenStyle';

const CommunityBoardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CommunityBoardScreen</Text>
    </SafeAreaView>
  );
};

export default memo(CommunityBoardScreen);
