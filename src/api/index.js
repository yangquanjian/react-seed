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
   * 查询个人客户基本信息
   */
  getPerCustBasic: ({ id }) => api.get('/customer/queryfspcustper', id),
  /**
   * 查询机构客户基本信息
   */
  getOrgCustBasic: ({ id }) => api.get('/customer/queryfspcustorg', id),
  /**
   * 查询个人客户联系方式
   */
  getPerCustCotact: ({ id }) => api.get('/customer/queryCustContact', id),
};
