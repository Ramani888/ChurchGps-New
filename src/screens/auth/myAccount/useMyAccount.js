import * as Yup from 'yup';
import { strings } from '../../../language/strings';
import { apiGet, apiPut } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const uploadProfileImage = body => {
  return apiPut(Api.uploadProfileImage, body);
};

export const getProfileData = () => {
  return apiGet(Api.getProfileData);
};

export const saveAccount = body => {
  return apiPut(Api.saveAccount, body);
};

export const AccountSchema = (skipBelowSection = false, skipImageSection = false) => {
  return Yup.object().shape({
    profileName: Yup.string().trim().required(strings.profileNameRequired),

    userName: Yup.string().trim().required(strings.userNameRequired),

    // Conditionally require profile image if section is not skipped
    profileImage: skipImageSection
      ? Yup.mixed().nullable()
      : Yup.mixed()
          .nullable()
          .test('fileRequired', strings.profileImageRequired, function(value) {
            if (!value || (!value.uri && !value.path)) {
              return this.createError({ message: strings.profileImageRequired });
            }
            return true;
          }),

    // Conditionally require bio if section is not skipped
    bio: skipBelowSection 
      ? Yup.string().trim().max(500, strings.bioValidation)
      : Yup.string().trim().required(strings.bioRequired).max(500, strings.bioValidation),

    // Conditionally require denomination if section is not skipped
    denomination: skipBelowSection
      ? Yup.string()
      : Yup.string().required(strings.denominationRequired),

    protestantDenomination: Yup.string().trim(),

    otherDenomination: Yup.string().trim(),
  });
};
