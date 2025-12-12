import { apiPost } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';
import { strings } from '../../../language/strings';
import * as Yup from 'yup';

// ======================================= Api ========================================= //

export const sendOtp = async body => {
  return apiPost(Api.sendOtp, body);
};

export const verifyOtp = async body => {
  return apiPost(Api.verifyOtp, body);
};

export const signUp = async body => {
  return apiPost(Api.signUp, body);
};

export const googleSignUp = async (googleId, email, displayName, profilePicture) => {
  // Send Google Sign-Up data to backend with authProvider flag
  return apiPost(Api.signUp, {
    authProvider: 'google',
    googleId,
    email,
    displayName,
    profilePicture,
    acceptedTnC: true,
  });
};

// ======================================= signup schema ========================================= //

export const SignupSchema = () => {
  const passwordValidation = Yup.string()
    .required(strings.passwordRequired)
    .test('strong-password', strings.strongPassword, function (value) {
      if (!value) {
        return true;
      }

      const isValid =
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[^A-Za-z0-9]/.test(value);

      return isValid;
    });

  return Yup.object().shape({
    dob: Yup.string().required(strings.dobRequired),
    email: Yup.string()
      .email(strings.validEmail)
      .required(strings.emailRequired),
    password: passwordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], strings.passwordMustMatch)
      .required(strings.confirmPasswordRequired),
    termsAndCondition: Yup.boolean().oneOf([true], strings.acceptTNC),
  });
};

export const formatDate = date => {
  if (!(date instanceof Date)) return '';

  const humanReadable = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // 2023-09-21
  const isoLike = date.toISOString().split('T')[0];

  return { humanReadable, isoLike };
};

// ======================================= End ========================================= //
