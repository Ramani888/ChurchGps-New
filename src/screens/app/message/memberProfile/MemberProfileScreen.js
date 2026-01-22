import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const MemberProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text>MemberProfileScreen</Text>
    </SafeAreaView>
  );
};

export default memo(MemberProfileScreen);
