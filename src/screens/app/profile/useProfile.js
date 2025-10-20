import { apiGet } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const getProfileData = () => {
  return apiGet(Api.getProfileData);
};
