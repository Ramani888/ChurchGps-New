import { apiGet } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const getCommunityPostApi = async (latitude, longitude) => {
  console.log('lat', latitude);
  console.log('long', longitude);
  return apiGet(`${Api.community}?lat=${latitude}&lng=${longitude}`);
};
