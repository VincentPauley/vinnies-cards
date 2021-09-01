import api from '@/api/index.js';

export default {
  getProductSetCardTypes(brand, product, printYear, series) {
    return api.get(
      `/card-types/brand/${brand}/product/${product}/print-year/${printYear}/series/${series}`
    );
  }
};

// s
