import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

axios.interceptors.response.use(config => {
  const { mode } = config.headers;
  console.log(`app running in: ${mode} mode`);
  return config;
});

export default {
  get(url, data) {
    return axios.get(`${BASE_URL}${url}`, data);
    // return new Promise((resolve, reject) => {
    //   axios
    //     .get(`${BASE_URL}${url}`, data)
    //     .then(r => {
    //       console.log('LOOK', r);
    //       resolve(r);
    //     })
    //     .catch(e => {
    //       reject('get(): ERROR: ', e);
    //     });
    // });
  }
};
