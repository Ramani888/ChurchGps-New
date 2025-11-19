import { Image, Pressable, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CustomHeader from '../../../custome/CustomHeader';
import Color from '../../../utils/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { strings } from '../../../language/strings';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';
import BottomFadeLinear from '../../../components/BottomFadeLinear';
import CustomInputField from '../../../custome/CustomInputField';
import CustomButton from '../../../custome/CustomButton';
import { styles } from './LoginStyle';
import { screenName } from '../../../utils/NavigationKey';
import { useNavigation } from '@react-navigation/native';
import { login, LoginSchema } from './useLogin';
import ToastMessage from '../../../utils/ToastMessage';
import { Formik } from 'formik';
import Loader from '../../../utils/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '../../../utils/Images';
import { useUserDetail } from '../../../context/UserContext';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useUserDetail();

  const handleLogin = useCallback(async values => {
    try {
      setIsLoading(true);
      const response = await login({
        email: values?.email,
        password: values?.password,
      });
      console.log('response', response);
      if (response?.success) {
        goToNext(response?.user?.token, response?.user, response?.message);
      }
    } catch (error) {
      console.log('error in login api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  });

  const goToNext = useCallback(
    async (token, user, message) => {
      await AsyncStorage.multiSet([
        ['TOKEN', token],
        ['USER', JSON.stringify(user)],
        [`SETUP_ACCOUNT_${user?._id}`, 'true'],
      ]);
      global.token = token;
      ToastMessage(message);
      signIn();
      navigation.reset({
        index: 0,
        routes: [{ name: screenName.tabStack }],
      });
    },
    [navigation],
  );

  const validationSchema = useMemo(() => LoginSchema(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <CustomHeader
        backArrowVisible={true}
        gradientTitle={strings.welcomeBack}
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
      />
      <KeyboardAwareScrollView
        ScrollViewComponent={GestureScrollView}
        keyboardShouldPersistTaps="handled"
        extraKeyboardSpace={0}
      >
        <Image
          source={Images.gpsMobileImage}
          style={styles.gpsImage}
          resizeMode="contain"
        />
        <View>
          <BottomFadeLinear
            height={520}
            bottomOpacity={1}
            midOpacity={1}
            topOpacity={0}
            midAt={0.5}
          />
        </View>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={true}
          onSubmit={values => {
            handleLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <View style={styles.form}>
              <CustomInputField
                label={strings.email}
                labelStyle={styles.heading}
                placeholder={strings.enterEmail}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                inputStyle={styles.inputStyle}
              />

              <CustomInputField
                label={strings.enterPassword}
                labelStyle={styles.heading}
                placeholder={strings.enterPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                eyeIcon={true}
                secureTextEntry={passwordVisible ? false : true}
                setEye={setPasswordVisible}
                eye={passwordVisible}
                inputStyle={styles.inputStyle}
                containerStyle={styles.inputContainer}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate(screenName.forgotPassword);
                }}
              >
                <Text style={styles.forgotPasswordText}>
                  {strings.forgotPassword}
                </Text>
              </Pressable>

              <View>
                <Text style={styles.devider} />
                <Text style={styles.or}>{strings.or}</Text>
              </View>

              <View style={styles.btnView}>
                <CustomButton
                  title={strings.signinWithGoogle}
                  buttonWidth={scale(167)}
                  backgroundColor={Color.transparent}
                  borderRadius={scale(30)}
                  marginBottom={verticalScale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Black}
                  fontFamily={Fonts.interSemiBold}
                  borderWidth={scale(0.8)}
                  borderColor={Color.Gray}
                  leftIcon={
                    <Image
                      source={Images.googleIcon}
                      style={styles.leftIconStyle}
                    />
                  }
                  gap={scale(5)}
                  onPress={() => {}}
                />
                <CustomButton
                  title={strings.signinWithApple}
                  buttonWidth={scale(167)}
                  backgroundColor={Color.transparent}
                  borderRadius={scale(30)}
                  marginBottom={verticalScale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Black}
                  fontFamily={Fonts.interSemiBold}
                  borderWidth={scale(0.8)}
                  borderColor={Color.Gray}
                  leftIcon={
                    <Image
                      source={Images.appleIcon}
                      style={styles.leftIconStyle}
                    />
                  }
                  gap={scale(5)}
                  onPress={() => {}}
                />
              </View>

              <CustomButton
                title={strings.login1}
                backgroundColor={Color.theme1}
                borderRadius={scale(30)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.sfProBold}
                marginTop={verticalScale(0)}
                marginBottom={verticalScale(20)}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(LoginScreen);
