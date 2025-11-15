import { Image, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './FilterScreenStyles';
import { strings } from '../../../language/strings';
import CustomHeader from '../../../custome/CustomHeader';
import { Images } from '../../../utils/Images';

const FilterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        gradientTitle={strings.filter}
        searchIcon={Images.searchIcon1}
        searchIconPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default memo(FilterScreen);
