import { apiPost } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const createCommunityPostApi = async body => {
  return apiPost(Api.community, body);
};
