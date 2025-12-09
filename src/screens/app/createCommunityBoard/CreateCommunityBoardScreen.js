import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateCommunityBoardStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Images } from '../../../utils/Images';
import { verticalScale } from '../../../utils/Responsive';

const CreateCommunityBoardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        firstLineTitle={strings.create}
        gradientTitle={strings.communityBoard}
        infoIcon={Images.infoIcon}
        titleViewStyle={{ marginTop: verticalScale(55) }}
        infoIconPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default memo(CreateCommunityBoardScreen);
