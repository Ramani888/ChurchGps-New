import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import { BlurView } from '@react-native-community/blur';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { OtpInput } from 'react-native-otp-entry';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@react-native-vector-icons/fontawesome';

import CustomHeader from '../../../custome/CustomHeader';
import CustomButton from '../../../custome/CustomButton';
import CustomInputField from '../../../custome/CustomInputField';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import CheckBox from '../../../custome/CustomCheckbox';
import LanguageBottomsheetContent from '../../../components/bottomSheetContent/LanguageBottomsheetContent';
import SuccessBottomsheetContent from '../../../components/bottomSheetContent/SuccessBottomsheetContent';
import DatePickerBottomsheetContent from '../../../components/bottomSheetContent/DatePickerBottomsheetContent';
import { useLanguage } from '../../../context/languageContext/LanguageContext';
import { useUserDetail } from '../../../context/UserContext';
import { strings } from '../../../language/strings';
import { sendOtp, signUp, SignupSchema, verifyOtp, googleSignUp } from './UseSignup';
import { screenName } from '../../../utils/NavigationKey';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import Loader from '../../../utils/Loader';
import ToastMessage from '../../../utils/ToastMessage';

import { styles } from './SignupStyle';
import { login } from '../login/useLogin';

const SignUpScreen = () => {
  const otpRef = useRef();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [eighteenPlus, setEighteenPlus] = useState(false);
  const [dob, setDob] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [blurVisible, setBlurVisible] = useState(false);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showAgeError, setShowAgeError] = useState(false);

  const languageSheetRef = useRef();
  const datePickerSheetRef = useRef();
  const successSheetRef = useRef();

  const { currentLanguage } = useLanguage();
  const { signIn } = useUserDetail();

  const calculateAge = useCallback(birthDate => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, []);

  const isUnder18 = useMemo(() => {
    if (!dob?.sendFormateDate) return false;
    const age = calculateAge(dob.sendFormateDate);
    return age < 18;
  }, [dob, calculateAge]);

  const clearOtp = useCallback(() => {
    otpRef.current?.clear();
  }, []);

  const getOtp = useCallback(
    async email => {
      try {
        if (!email) {
          ToastMessage(strings.pleaseEnterEmail);
          return;
        }
        setIsLoading(true);
        const response = await sendOtp({ email: email });
        if (response?.success) {
          clearOtp();
          setEnableOtpField(true);
          ToastMessage(response?.message);
        }
      } catch (error) {
        console.log('error in sent otp api', error);
        const msg = error.message || strings.somethingWentWrong;
        ToastMessage(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [clearOtp],
  );

  const handleOtpFilled = useCallback(async (otp, email) => {
    try {
      setIsLoading(true);
      const response = await verifyOtp({ email: email, otp: otp });
      if (response?.success) {
        ToastMessage(response?.message);
        setEnableOtpField(false);
        setOtpVerified(true);
      }
    } catch (error) {
      console.log('error in sent otp api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goToNext = useCallback(
    async (token, user, message) => {
      await AsyncStorage.multiSet([
        ['TOKEN', token],
        ['USER', JSON.stringify(user)],
        [`SETUP_ACCOUNT_${user?._id}`, 'false'],
      ]);
      global.token = token;
      signIn();
      openSuccessBottomsheet();
    },
    [navigation],
  );

  const handleLogin = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      const response = await login({
        email: email,
        password: password,
      });
      if (response?.success) {
        goToNext(response?.user?.token, response?.user);
      }
    } catch (error) {
      console.log('error in login api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  });

  const handleCreateAccount = useCallback(
    async values => {
      try {
        if (isUnder18) {
          setShowAgeError(true);
          ToastMessage(strings.must18Plus);
          return;
        }

        setIsLoading(true);
        const response = await signUp({
          email: values.email,
          password: values.password,
          dob: values.dob,
          acceptedTnC: values.termsAndCondition,
        });

        if (response?.success) {
          handleLogin(values.email, values.password);
        }
      } catch (error) {
        console.log('error in sign up api', error);
        const msg = error.message || strings.somethingWentWrong;
        ToastMessage(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [goToNext, isUnder18],
  );

  const handleGoogleSignUp = useCallback(async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { data } = await GoogleSignin.signIn();
      const { user } = data;

      if (!user?.id || !user?.email) {
        ToastMessage('Failed to get Google user info');
        return;
      }

      const signUpResponse = await googleSignUp(user.id, user.email, user.name, user.photo);

      if (signUpResponse?.success) {
        goToNext(signUpResponse.user);
      } else {
        ToastMessage(signUpResponse?.message || strings.somethingWentWrong);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) return;

      const errorMessages = {
        [statusCodes.IN_PROGRESS]: 'Sign-in already in progress',
        [statusCodes.PLAY_SERVICES_NOT_AVAILABLE]: 'Google Play Services not available or outdated',
      };

      const errorMsg = errorMessages[error.code] || error.message || strings.somethingWentWrong;
      ToastMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [goToNext]);

  const openLanguageBottomsheet = () => {
    languageSheetRef.current.show();
  };

  const openCalenderBottomsheet = () => {
    datePickerSheetRef.current.show();
  };

  const openSuccessBottomsheet = () => {
    successSheetRef.current.show();
  };

  const closeSuccessBottomsheet = () => {
    successSheetRef.current.hide();
  };

  const validationSchema = useMemo(() => SignupSchema(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <CustomHeader
        backArrowVisible={true}
        gradientTitle={strings.welcome}
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
      />
      <KeyboardAwareScrollView
        ScrollViewComponent={GestureScrollView}
        keyboardShouldPersistTaps="handled"
        extraKeyboardSpace={0}
      >
        <Formik
          initialValues={{
            dob: '',
            email: '',
            otp: '',
            password: '',
            confirmPassword: '',
            termsAndCondition: false,
          }}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={true}
          onSubmit={values => {
            if (!otpVerified) {
              ToastMessage(strings.otpNotVerified);
              return;
            }
            handleCreateAccount(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            setFieldTouched,
          }) => (
            <View style={styles.contentContainer}>
              <View style={styles.btnView}>
                <CustomButton
                  title={strings.signupWithGoogle}
                  buttonWidth={scale(167)}
                  backgroundColor={Color.transparent}
                  borderRadius={scale(30)}
                  marginBottom={verticalScale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Black}
                  fontFamily={Fonts.interSemiBold}
                  borderWidth={scale(0.8)}
                  borderColor={Color.Gray}
                  leftIcon={<Image source={Images.googleIcon} style={styles.leftIconStyle} />}
                  gap={scale(5)}
                  onPress={handleGoogleSignUp}
                />
                <CustomButton
                  title={strings.signUpWithApple}
                  buttonWidth={scale(167)}
                  backgroundColor={Color.transparent}
                  borderRadius={scale(30)}
                  marginBottom={verticalScale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Black}
                  fontFamily={Fonts.interSemiBold}
                  borderWidth={scale(0.8)}
                  borderColor={Color.Gray}
                  leftIcon={<Image source={Images.appleIcon} style={styles.leftIconStyle} />}
                  gap={scale(5)}
                  onPress={() => {}}
                />
              </View>

              <View>
                <Text style={styles.heading}>{strings.selectLanguage}</Text>
                <CustomButton
                  title={currentLanguage}
                  backgroundColor={Color.fieldColor}
                  marginVertical={verticalScale(8)}
                  borderRadius={scale(16)}
                  buttonHeight={verticalScale(46)}
                  rightIcon={<FontAwesome name="angle-down" size={scale(25)} color={Color.Black} />}
                  justifyContent={'space-between'}
                  paddingHorizontal={scale(20)}
                  fontSize={scale(14)}
                  fontFamily={Fonts.interRegular}
                  fontColor={Color.Black}
                  onPress={openLanguageBottomsheet}
                />
              </View>

              <View>
                <Text style={styles.heading}>{strings.dateOfBirth}</Text>
                <CustomButton
                  title={dob?.showDate ?? 'dd/mm/yyyy'}
                  backgroundColor={isUnder18 && dob?.showDate ? '#FFE5E5' : '#9F9F9F1A'}
                  marginTop={verticalScale(8)}
                  borderRadius={scale(16)}
                  buttonHeight={verticalScale(46)}
                  rightIcon={<FontAwesome name="angle-down" size={scale(25)} color={Color.Black} />}
                  justifyContent={'space-between'}
                  paddingHorizontal={scale(20)}
                  fontSize={scale(14)}
                  fontFamily={Fonts.interRegular}
                  fontColor={
                    isUnder18 && dob?.showDate
                      ? '#DC143C'
                      : dob?.showDate
                      ? Color.Black
                      : Color.Gray
                  }
                  borderWidth={isUnder18 && dob?.showDate ? scale(1) : 0}
                  borderColor={isUnder18 && dob?.showDate ? '#DC143C' : 'transparent'}
                  onPress={openCalenderBottomsheet}
                />
                {touched.dob && errors.dob ? (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                ) : null}
                {isUnder18 && dob?.showDate && showAgeError ? (
                  <Text style={styles.errorText}>{strings.must18Plus}</Text>
                ) : null}
              </View>

              <View style={styles.checkboxView}>
                <CheckBox
                  onPress={() => setEighteenPlus(!eighteenPlus)}
                  title={strings.eighteenPlusString}
                  isChecked={eighteenPlus}
                  checkboxColor={Color.theme1}
                  checkboxSize={scale(22)}
                  checkboxTitleStyle={styles.checkboxTitleStyle}
                />
              </View>

              <View style={styles.emailView}>
                <CustomInputField
                  label={strings.email}
                  labelStyle={styles.heading}
                  placeholder={strings.enterEmail}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  inputStyle={[styles.inputStyle, { width: scale(244) }]}
                />
                <CustomButton
                  title={strings.getCode}
                  backgroundColor={Color.theme2}
                  fontSize={scale(12)}
                  fontColor={Color.White}
                  borderRadius={scale(30)}
                  buttonWidth={scale(95)}
                  buttonHeight={verticalScale(46)}
                  marginTop={verticalScale(30)}
                  onPress={() => {
                    setFieldTouched('email', true);
                    if (errors.email) return;
                    Keyboard.dismiss();
                    getOtp(values.email);
                  }}
                />
              </View>
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <View style={styles.otpView}>
                <OtpInput
                  ref={otpRef}
                  numberOfDigits={6}
                  onFilled={otp => handleOtpFilled(otp, values.email)}
                  autoFocus={false}
                  disabled={!enableOtpField}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                  }}
                />
              </View>

              <View style={styles.passwordView}>
                <CustomInputField
                  label={strings.createPassword}
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
                />

                <CustomInputField
                  placeholder={strings.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  eyeIcon={true}
                  secureTextEntry={confirmPasswordVisible ? false : true}
                  setEye={setConfirmPasswordVisible}
                  eye={confirmPasswordVisible}
                  inputStyle={[styles.inputStyle, { marginTop: verticalScale(10) }]}
                />
              </View>

              <View>
                <CheckBox
                  onPress={() => setFieldValue('termsAndCondition', !values.termsAndCondition)}
                  title={strings.termsAndCondition}
                  isChecked={values.termsAndCondition}
                  checkboxColor={Color.theme1}
                  checkboxSize={scale(22)}
                  checkboxTitleStyle={styles.checkboxTitleStyle}
                />
              </View>
              {touched.termsAndCondition && errors.termsAndCondition ? (
                <Text style={styles.errorText}>{errors.termsAndCondition}</Text>
              ) : null}

              <CustomButton
                title={strings.createAccount}
                backgroundColor={Color.theme1}
                borderRadius={scale(30)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.sfProBold}
                marginTop={verticalScale(15)}
                marginBottom={verticalScale(20)}
                onPress={handleSubmit}
              />

              <CustomBottomsheet ref={datePickerSheetRef} setBlurVisible={setBlurVisible}>
                <DatePickerBottomsheetContent
                  setDob={date => {
                    setDob(date);
                    setFieldValue('dob', date.sendFormateDate);
                    setShowAgeError(false);
                  }}
                  setEighteenPlus={setEighteenPlus}
                />
              </CustomBottomsheet>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <CustomBottomsheet ref={languageSheetRef} setBlurVisible={setBlurVisible}>
        <LanguageBottomsheetContent />
      </CustomBottomsheet>

      <CustomBottomsheet ref={successSheetRef} setBlurVisible={setBlurVisible}>
        <SuccessBottomsheetContent closeSuccessBottomsheet={closeSuccessBottomsheet} />
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

export default memo(SignUpScreen);
