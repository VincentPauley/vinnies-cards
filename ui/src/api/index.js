import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

import store from '@/store';

axios.interceptors.response.use(config => {
  const { mode } = config.headers;
  console.log(`app running in: ${mode} mode`);

  store.commit('setMode', mode);
  return config;
});

export default {
  get(url, data) {
    return axios.get(`${BASE_URL}${url}`, data);
  }
};
