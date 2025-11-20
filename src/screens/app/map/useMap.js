import { apiGet } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const getGatheringApi = () => {
  return apiGet(Api.gathering);
};
