import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../custome/CustomHeader';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';
import { strings } from '../../../language/strings';
import { styles } from './ForgotPasswordStyle';
import CustomInputField from '../../../custome/CustomInputField';
import CustomButton from '../../../custome/CustomButton';
import Color from '../../../utils/Color';
import { OtpInput } from 'react-native-otp-entry';
import { forgotPassword, ForgotPasswordSchema, sendOtp, verifyOtp } from './useForgotPassword';
import { Formik } from 'formik';
import { screenName } from '../../../utils/NavigationKey';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import ToastMessage from '../../../utils/ToastMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import { Images } from '../../../utils/Images';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const otpRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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
      console.log('error in verify otp api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleForgotPassword = useCallback(async values => {
    try {
      setIsLoading(true);
      const response = await forgotPassword({
        email: values.email,
        password: values.password,
      });
      if (response?.success) {
        ToastMessage(response?.message);
        navigation.navigate(screenName.login);
      }
    } catch (error) {
      console.log('error in forgot password api', error);
      const msg = error.message || strings.somethingWentWrong;
      ToastMessage(msg);
    } finally {
      setIsLoading(false);
    }
  });

  const clearOtp = () => {
    if (otpRef.current) {
      otpRef.current.clear();
    }
  };

  const validationSchema = useMemo(() => ForgotPasswordSchema(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <CustomHeader
        backArrowVisible={true}
        gradientTitle={strings.forgotPasswordTitle}
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange={true}
        onSubmit={values => {
          if (!otpVerified) {
            ToastMessage(strings.otpNotVerified);
            return;
          }
          handleForgotPassword(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldTouched }) => (
          <>
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                ScrollViewComponent={GestureScrollView}
                keyboardShouldPersistTaps="handled"
                extraKeyboardSpace={0}
                contentContainerStyle={styles.contentContainerStyle}
              >
                <Image source={Images.forgotPasswordIcon} style={styles.passwordIconStyle} />
                <View style={styles.formView}>
                  <View style={styles.emailView}>
                    <CustomInputField
                      label={strings.enterCodeEmail}
                      labelStyle={styles.heading}
                      placeholder={strings.enterEmail}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
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
                </View>
                <View style={styles.footer}>
                  <CustomButton
                    title={strings.submit}
                    backgroundColor={Color.theme1}
                    buttonWidth={'90%'}
                    borderRadius={scale(30)}
                    fontSize={moderateScale(16)}
                    fontColor={Color.Black}
                    fontFamily={Fonts.sfProBold}
                    marginTop={verticalScale(15)}
                    marginBottom={verticalScale(20)}
                    aligs
                    // position={'absolute'}
                    // bottom={verticalScale(0)}
                    onPress={handleSubmit}
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default memo(ForgotPasswordScreen);
