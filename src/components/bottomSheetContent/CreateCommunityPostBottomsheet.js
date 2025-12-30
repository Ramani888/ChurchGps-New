import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import Color from '../../utils/Color';
import { strings } from '../../language/strings';
import LocationPreview from '../LocationPreview';
import CustomButton from '../../custome/CustomButton';

const CreateCommunityPostBottomsheet = ({ latitude, longitude, createCommunityPost }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{strings.giveLocationExcess}</Text>

      <View style={styles.mapView}>
        <LocationPreview
          latitude={latitude}
          longitude={longitude}
          containerStyle={styles.mapContainerStyle}
        />
      </View>

      <CustomButton
        title={strings.confirm}
        backgroundColor={Color.theme1}
        borderRadius={scale(30)}
        fontSize={moderateScale(16)}
        fontColor={Color.Black}
        fontFamily={Fonts.sfProBold}
        marginTop={verticalScale(15)}
        onPress={() => createCommunityPost()}
      />
    </SafeAreaView>
  );
};

export default memo(CreateCommunityPostBottomsheet);

const styles = StyleSheet.create({
  container: { padding: scale(22) },
  text: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.interMedium,
    color: Color.Black,
    textAlign: 'center',
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(10),
  },
  mapView: { marginVertical: verticalScale(10) },
  mapContainerStyle: {
    alignSelf: 'center',
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    overflow: 'hidden',
  },
});
