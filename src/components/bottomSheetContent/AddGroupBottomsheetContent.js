import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import GradientText from '../GradientText';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';

const AddGroupBottomsheetContent = () => {
  const data = [
    {
      image:
        'https://e7.pngegg.com/pngimages/534/815/png-clipart-computer-icons-book-book-angle-rectangle-thumbnail.png',
      name: 'Jims Church',
    },
    {
      image:
        'https://e7.pngegg.com/pngimages/534/815/png-clipart-computer-icons-book-book-angle-rectangle-thumbnail.png',
      name: 'Jims Church',
    },
  ];

  const renderList = useCallback(({ item }) => {
    return (
      <View style={styles.listContainer}>
        <Image source={{ uri: item?.image }} style={styles.image} />
        <Text style={styles.name}>{item?.name}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.indicator} />
      <GradientText text={strings.yourGroup} colors={Color.gradientColor1} style={styles.title} />

      <View>
        <FlatList data={data} renderItem={renderList} style={styles.flatlist} />
      </View>
    </View>
  );
};

export default AddGroupBottomsheetContent;

const styles = StyleSheet.create({
  container: { marginHorizontal: scale(15) },
  indicator: {
    backgroundColor: Color.Gray,
    width: moderateScale(60),
    height: verticalScale(5),
    marginTop: verticalScale(20),
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    alignSelf: 'center',
    paddingTop: verticalScale(10),
    letterSpacing: scale(-1),
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  image: { width: scale(40), height: scale(40), borderRadius: scale(40) },
  name: { fontSize: moderateScale(16), fontFamily: Fonts.interSemiBold, color: Color.Black },
  flatlist: {
    marginBottom: verticalScale(20),
    marginTop: verticalScale(10),
    maxHeight: verticalScale(253),
  },
});
