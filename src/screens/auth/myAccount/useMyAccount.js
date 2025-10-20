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

export const AccountSchema = () => {
  return Yup.object().shape({
    profileName: Yup.string().trim().required(strings.profileNameRequired),

    userName: Yup.string().trim().required(strings.userNameRequired),

    bio: Yup.string().trim().max(500, strings.bioValidation),

    denomination: Yup.string(),

    protestantDenomination: Yup.string().trim(),

    otherDenomination: Yup.string().trim(),
  });
};
