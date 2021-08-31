import api from '@/api/index.js';

export default {
  /**
   * @method getSeriesForProduct
   *
   * provided you know the card's brand, product, and printYear - this
   * will return the series number on that product
   *
   * @param {string} brand - the abbreviated brand ID you want products for
   * @param {string} product - the line of product brand has produced
   * @param {number} printYear - year card was printed
   */
  getSeriesForProduct(brand, product, printYear) {
    return api.get(
      `/series/brand/${brand}/product/${product}/printYear/${printYear}`
    );
  }
};
