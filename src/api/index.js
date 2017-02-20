import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {
  /**
   * 获取产品列表
   */
  getProductList: ({ categoryId }) => api.get('/product/list', { categoryId }),
  /**
   * 获取客户详细信息
   */
  getCustomer: ({ id }) => api.get('/customer/detail', { id }),
  /**
   * 保存客户信息
   */
  saveCustomer: ({ data }) => api.post('/customer/save', data),
  /**
   * 查询客户基本信息
   */
  getCustBasic: ({ id }) => api.get('/customer/getbasic', id),
  /**
   * 查询客户基本信息
   */
  getPerCustCotact: ({ id }) => api.get('/customer/perCustContact', id),
};
