import api from '@/api/index.js';

export default {
  getBrands() {
    return api.get('/brands');
  }
};
