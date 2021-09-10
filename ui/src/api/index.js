import axios from 'axios';

import store from '@/store';

const BASE_URL = 'http://localhost:3000';

axios.interceptors.response.use(config => {
  const { mode } = config.headers;

  store.commit('setMode', mode);
  return config;
});

export default {
  get(url, data) {
    return axios.get(`${BASE_URL}${url}`, data);
  }
};
