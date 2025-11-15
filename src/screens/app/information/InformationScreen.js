import { Text, View } from 'react-native';
import React, { memo } from 'react';
import { styles } from './InformationScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../custome/CustomHeader';
import { Images } from '../../../utils/Images';

const InformationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible titleImageIcon={Images.informationIcon} />
    </SafeAreaView>
  );
};

export default memo(InformationScreen);
