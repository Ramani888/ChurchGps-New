import * as Yup from 'yup';
import { strings } from '../../../language/strings';
import { Api } from '../../../api/EndPoint';
import { apiPost } from '../../../api/ApiServices';

export const CreateGatheringSchema = () => {
  return Yup.object().shape({
    description: Yup.string().trim().required('Description is required'),
    groupName: Yup.string().trim().required(strings.groupNameRequired),
    denomination: Yup.string(),
    protestantDenomination: Yup.string().trim(),
    otherDenomination: Yup.string().trim(),
  });
};

// ======================================= Api ========================================= //

export const createGatheringApi = async body => {
  return apiPost(Api.gathering, body);
};

export const uploadGroupPictureApi = (gatheringId, body) => {
  return apiPost(`${Api.uploadProfileImage}?gatheringId=${gatheringId}`, body);
};
