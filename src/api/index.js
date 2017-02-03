import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {
  /**
   * 获取产品列表
   */
  getProductList: () => api.get('/product/list'),
  /**
   * 获取客户详细信息
   */
  getCustomer: () => api.get('/customer/detail'),
};
