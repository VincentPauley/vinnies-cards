import api from '@/api/index.js';

export default {
  /**
   * @method getProductsForBrand
   *
   * Returns a list of products made by a specific brand
   * of manufacturer.
   *
   * @param {string} brand - the abbreviated brand ID you want products for
   */
  getProductsForBrand(brand) {
    return api.get(`/products/brand/${brand}`);
  }
};
