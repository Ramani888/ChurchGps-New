import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import CustomButton from '../../custome/CustomButton';
import Color from '../../utils/Color';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';
import { useStateContext } from '../../context/StateContext';
import { useFocusEffect } from '@react-navigation/native';

const ChangeBackgroundBottomsheetContent = ({ closeChangeBackgroundBottomsheet }) => {
  const [backgroundNumber, setBackgroundNumber] = useState('1');
  const { handleBackgrounChange, changeBackgroundNumber } = useStateContext();

  useFocusEffect(
    useCallback(() => {
      setBackgroundNumber(changeBackgroundNumber);
    }, [changeBackgroundNumber]),
  );

  const imageData = [
    { id: '1', image: Images.background1 },
    { id: '2', image: Images.background2 },
    { id: '3', image: Images.background3 },
    { id: '4', image: Images.background4 },
    { id: '5', image: Images.background5 },
    { id: '6', image: Images.background6 },
    { id: '7', image: Images.background7 },
    { id: '8', image: Images.background8 },
    { id: '9', image: Images.background9 },
  ];

  const renderImages = useCallback(
    ({ item }) => {
      const selected = backgroundNumber === item?.id;

      return (
        <TouchableOpacity
          style={[styles.itemContainer, { borderWidth: selected ? scale(2) : 0 }]}
          onPress={() => setBackgroundNumber(item?.id)}
        >
          <Image source={item?.image} style={styles.image} />
        </TouchableOpacity>
      );
    },
    [backgroundNumber],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imageData}
        renderItem={renderImages}
        numColumns={3}
        key={'_'}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
      <CustomButton
        title={strings.select}
        buttonWidth={scale(331)}
        buttonHeight={verticalScale(53)}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(10)}
        onPress={() => {
          closeChangeBackgroundBottomsheet();
          handleBackgrounChange(backgroundNumber);
        }}
      />
    </SafeAreaView>
  );
};

export default memo(ChangeBackgroundBottomsheetContent);

const styles = StyleSheet.create({
  container: { padding: scale(17) },
  columnWrapperStyle: { justifyContent: 'center', gap: scale(10) },
  itemContainer: {
    marginBottom: verticalScale(11),
    borderColor: Color.theme1,
    borderRadius: scale(20),
  },
  image: { width: scale(106), height: scale(70), borderRadius: scale(20) },
});
