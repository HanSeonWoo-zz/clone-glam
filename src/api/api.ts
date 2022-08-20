import axios from 'axios';
export const BASE_URL = 'https://test.dev.cupist.de';

export const getIntroduction = async () => {
  const res = await axios.get(BASE_URL + '/introduction');
  return res.data;
};
export const getIntroductionAdditional = async (url?: string) => {
  const res = await axios.get(BASE_URL + (url || '/introduction/additional'));
  return res.data;
};
export const postIntroductionCustom = async () => {
  const res = await axios.post(BASE_URL + '/introduction/custom');
  return res.data;
};
export const getProfile = async () => {
  const res = await axios.get(BASE_URL + '/profile');
  return res.data;
};
