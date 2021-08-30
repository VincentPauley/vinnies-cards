import api from '@/api/index.js';

const BASE_ROUTE = '/supported-years';

export default {
  getProductYearsSupported(brand, product) {
    console.log('getProductYearsSupported called...');
    // TODO: helper function possible here:
    return api.get(`${BASE_ROUTE}/brand/${brand}/product/${product}`);
  }
};
