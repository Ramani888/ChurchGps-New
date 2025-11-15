import { FlatList, Image, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateGatheringScreenStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Shadow } from 'react-native-shadow-2';
import CheckBox from '../../../custome/CustomCheckbox';
import Color from '../../../utils/Color';
import { scale } from '../../../utils/Responsive';

const CreateGatheringScreen = () => {
  const [gatheringOption, setGatheringOption] = useState([]);
  console.log('gatheringOption', gatheringOption);

  const gatheringData = [
    'Music',
    'Bible Study',
    'Public Help',
    'Full Service',
    'Casual',
    'Evangelize',
  ];

  const toggleGatheringOption = item => {
    setGatheringOption(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const renderGatheringoption = useCallback(
    ({ item }) => {
      const isSelected = gatheringOption.includes(item);

      return (
        <View style={styles.checkboxView}>
          <CheckBox
            onPress={() => toggleGatheringOption(item)}
            isChecked={isSelected}
            checkboxColor={Color.theme1}
            checkboxSize={scale(24)}
            size={scale(18.5)}
          />
          <Text style={styles.checkboxTitleStyle}>{item}</Text>
        </View>
      );
    },
    [gatheringOption],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible gradientTitle={strings.createGathering} />

      <View style={styles.childContainer}>
        <Shadow
          distance={40} // Blur = 40
          offset={[0, 0]} // X = 0, Y = 0
          startColor="rgba(0,0,0,0.12)" // Shadow color
          finalColor="rgba(0,0,0,0)" // Fade out smoothly
          radius={16} // Your container border radius
          style={styles.shadowView}
        >
          <Text style={styles.headingStyle}>{strings.gathering}</Text>

          <View style={styles.gatheringOptionStyle}>
            <FlatList
              data={gatheringData}
              renderItem={renderGatheringoption}
              numColumns={3}
              key={'_'}
            />
          </View>
        </Shadow>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreateGatheringScreen);
