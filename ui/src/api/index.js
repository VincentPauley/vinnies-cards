import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  get(url, data) {
    return axios.get(`${BASE_URL}${url}`, data);
    // async retrieveBrands() {
    //   try {
    //     const brandResponse = await axios.get("http://localhost:3000/brands");

    //     if (brandResponse.status !== 200) {
    //       throw new Error(
    //         `improper resonse code for GET /brands: ${brandResponse.status}`
    //       );
    //     }

    //     this.brandOptions = brandResponse.data;
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
  }
};
