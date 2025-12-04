import { Image, Keyboard, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';
import Color from '../../../utils/Color';
import CustomButton from '../../../custome/CustomButton';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import CustomInputField from '../../../custome/CustomInputField';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import { BlurView } from '@react-native-community/blur';
import { styles } from './SignupStyle';
import { Formik } from 'formik';
import Loader from '../../../utils/Loader';
import ToastMessage from '../../../utils/ToastMessage';
import { sendOtp, signUp, SignupSchema, verifyOtp } from './UseSignup';
import CheckBox from '../../../custome/CustomCheckbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '../../../context/languageContext/LanguageContext';
import LanguageBottomsheetContent from '../../../components/bottomSheetContent/LanguageBottomsheetContent';
import SuccessBottomsheetContent from '../../../components/bottomSheetContent/SuccessBottomsheetContent';
import DatePickerBottomsheetContent from '../../../components/bottomSheetContent/DatePickerBottomsheetContent';
import { Images } from '../../../utils/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserDetail } from '../../../context/UserContext';

const SignUpScreen = () => {
  const otpRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [eighteenPlus, setEighteenPlus] = useState(false);
  const [dob, setDob] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [blurVisible, setBlurVisible] = useState(false);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const languageSheetRef = useRef();
  const datePickerSheetRef = useRef();
  const successSheetRef = useRef();

  const { currentLanguage } = useLanguage();
  const { signIn } = useUserDetail();

  const getOtp = useCallback(async email => {
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
  }, []);

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

  const handleCreateAccount = useCallback(async values => {
    try {
      setIsLoading(true);
      const response = await signUp({
        email: values.email,
        password: values.password,
        dob: values.dob,
        acceptedTnC: values.termsAndCondition,
      });
      console.log('response', response);
      if (response.success) {
        goToNext(response?.user);
      }
    } catch (error) {
      console.log('error in sign up api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goToNext = useCallback(
    async user => {
      await AsyncStorage.setItem('USER', JSON.stringify(user));
      signIn();
      openSuccessBottomsheet();
    },
    [openSuccessBottomsheet],
  );

  const clearOtp = () => {
    if (otpRef.current) {
      otpRef.current.clear();
    }
  };

  const openLanguageBottomsheet = () => {
    languageSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  };

  const closeLanguageBottomsheet = () => {
    setBlurVisible(false);
    languageSheetRef.current.hide();
  };

  const openCalenderBottomsheet = () => {
    datePickerSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  };

  const closeCalenderBottomsheet = () => {
    setBlurVisible(false);
    datePickerSheetRef.current.hide();
  };

  const openSuccessBottomsheet = () => {
    successSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  };

  const closeSuccessBottomsheet = () => {
    setBlurVisible(false);
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
              <Text style={styles.subTitle}>{strings.createSearchAndConnect}</Text>

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
                  onPress={() => {}}
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
                  backgroundColor={'#9F9F9F1A'}
                  marginTop={verticalScale(8)}
                  borderRadius={scale(16)}
                  buttonHeight={verticalScale(46)}
                  rightIcon={<FontAwesome name="angle-down" size={scale(25)} color={Color.Black} />}
                  justifyContent={'space-between'}
                  paddingHorizontal={scale(20)}
                  //   marginBottom={verticalScale(10)}
                  fontSize={scale(14)}
                  fontFamily={Fonts.interRegular}
                  fontColor={dob?.showDate ? Color.Black : Color.Gray}
                  onPress={openCalenderBottomsheet}
                />
                {touched.dob && errors.dob ? (
                  <Text style={styles.errorText}>{errors.dob}</Text>
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
                  keyboardType={'email-address'}
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
                    if (errors.email) {
                      return;
                    }
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

              <CustomBottomsheet
                ref={datePickerSheetRef}
                onBottomsheetClose={closeCalenderBottomsheet}
                bottomSheetContent={
                  <DatePickerBottomsheetContent
                    setDob={date => {
                      setDob(date);
                      setFieldValue('dob', date.sendFormateDate);
                    }}
                    setEighteenPlus={setEighteenPlus}
                  />
                }
              />
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

      <CustomBottomsheet
        ref={languageSheetRef}
        onBottomsheetClose={closeLanguageBottomsheet}
        bottomSheetContent={<LanguageBottomsheetContent />}
      />

      <CustomBottomsheet
        ref={successSheetRef}
        onBottomsheetClose={closeSuccessBottomsheet}
        bottomSheetContent={<SuccessBottomsheetContent />}
      />
    </SafeAreaView>
  );
};

export default memo(SignUpScreen);
