import { Text, View } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateCommunityBoardStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomInputField from '../../../custome/CustomInputField';
import CustomButton from '../../../custome/CustomButton';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';
import { BlurView } from '@react-native-community/blur';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import CreateCommunityPostBottomsheet from '../../../components/bottomSheetContent/CreateCommunityPostBottomsheet';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../../utils/Loader';
import { requestLocationPermission } from '../../../utils/ReusableFunctions';
import ToastMessage from '../../../utils/ToastMessage';
import { apiPost } from '../../../api/ApiServices';
import { createCommunityPostApi } from './useCreateCommunity';
import CreateCommunitySuccessBottomsheet from '../../../components/bottomSheetContent/CreateCommunitySuccessBottomsheet';
import { useRoute } from '@react-navigation/native';

const CreateCommunityBoardScreen = () => {
  const route = useRoute();
  const sheetRef = useRef();
  const successSheetRef = useRef();

  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [blurVisible, setBlurVisible] = useState(false);
  //   const [latitude, setLatitude] = useState('');
  //   const [longitude, setlongitude] = useState('');

  const { latitude, longitude } = route.params ?? {};

  // ========================================== Api ========================================== //

  const createCommunityPost = useCallback(async () => {
    const body = {
      description: description,
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    try {
      setVisible(true);
      const response = await createCommunityPostApi(body);
      if (response?.success) {
        closeBottomsheet();
        openSuccessBottomsheet();
      } else {
        ToastMessage(response?.message);
      }
      console.log('create community post response', response);
    } catch (error) {
      console.log('error in create community post', error);
    } finally {
      setVisible(false);
    }
  }, [description, latitude, longitude]);

  // ========================================== End ========================================== //

  const openBottomsheet = useCallback(() => {
    sheetRef.current.show();
  }, []);

  const closeBottomsheet = useCallback(() => {
    sheetRef.current.hide();
  }, []);

  const openSuccessBottomsheet = useCallback(() => {
    successSheetRef.current.show();
  }, []);

  const closeSuccessBottomsheet = useCallback(() => {
    successSheetRef.current.hide();
  }, []);

  //   const getCurrentLocation = useCallback(async () => {
  //     try {
  //       const hasPermission = await requestLocationPermission();
  //       if (!hasPermission) {
  //         Alert.alert(
  //           'Permission Required',
  //           'Location permission is required to get your current location.',
  //         );
  //         return null;
  //       }
  //       if (hasPermission) {
  //         setVisible(true);
  //         Geolocation.getCurrentPosition(position => {
  //           const { latitude, longitude } = position.coords;
  //           setLatitude(latitude);
  //           setlongitude(longitude);
  //           openBottomsheet();
  //         });
  //       }
  //     } catch (error) {
  //       console.log('error in get current location', error);
  //     } finally {
  //       setVisible(false);
  //     }
  //   }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={visible} />
      <CustomHeader
        backArrowVisible
        firstLineTitle={strings.create}
        gradientTitle={strings.communityBoard}
        infoIcon={Images.infoIcon}
        titleViewStyle={{ marginTop: verticalScale(55) }}
        infoIconPress={() => {}}
      />

      <View style={styles.bodyContaier}>
        <CustomInputField
          label={strings.description}
          labelStyle={styles.headingStyle}
          placeholder={strings.enterDescription}
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={4}
          inputStyle={styles.inputStyle}
        />

        <View style={styles.bottomView}>
          <Text style={styles.infoText}>{strings.communityBoardNote2}</Text>
          <CustomButton
            title={strings.create}
            backgroundColor={Color.theme1}
            borderRadius={scale(30)}
            fontSize={moderateScale(16)}
            fontColor={Color.Black}
            fontFamily={Fonts.sfProBold}
            marginTop={verticalScale(15)}
            marginBottom={verticalScale(20)}
            onPress={() => {
              if (description) {
                openBottomsheet();
              } else {
                ToastMessage(strings.selectDescription);
              }
            }}
          />
        </View>
      </View>

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={sheetRef} setBlurVisible={setBlurVisible}>
        <CreateCommunityPostBottomsheet
          latitude={latitude}
          longitude={longitude}
          createCommunityPost={createCommunityPost}
        />
      </CustomBottomsheet>

      <CustomBottomsheet ref={successSheetRef} setBlurVisible={setBlurVisible}>
        <CreateCommunitySuccessBottomsheet closeSuccessBottomsheet={closeSuccessBottomsheet} />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

export default memo(CreateCommunityBoardScreen);
