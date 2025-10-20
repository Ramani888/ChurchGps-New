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

export const forgotPassword = async body => {
  return apiPost(Api.login, body);
};

// ============================= Forgot Password schema ================================ //

export const ForgotPasswordSchema = () => {
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
    email: Yup.string()
      .email(strings.validEmail)
      .required(strings.emailRequired),
    password: passwordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], strings.passwordMustMatch)
      .required(strings.confirmPasswordRequired),
  });
};

// ======================================= End ========================================= //
