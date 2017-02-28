import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {

  /**
   * 暴露api上的几个底层方法: get / post / setAuthInfo
   */
  ...api,

  /**
   * 获取产品列表
   */
  getProductList: ({ categoryId }) => api.post('/product/list', { categoryId }),
  /**
   * 获取客户详细信息
   */
  getCustomer: ({ id }) => api.post('/customer/detail', { id }),
  /**
   * 保存客户信息
   */
  saveCustomer: ({ data }) => api.post('/customer/save', data),
  /**
   * 查询个人客户基本信息
   */
  getPerCustBasic: ({ id }) => api.post('/customer/queryfspcustper', id),
  /**
   * 查询机构客户基本信息
   */
  getOrgCustBasic: ({ id }) => api.post('/customer/queryfspcustorg', id),
  /**
   * 查询个人客户联系方式
   */
  getPerCustCotact: ({ id }) => api.post('/customer/custContact', id),
  /**
   * 查询机构客户联系方式
   */
  getOrgCustCotact: ({ id }) => api.post('/customer/custContactOrg', id),
  /**
   * 获取客户信息
   */
  getCustomerInfo: ({ id }) => api.post('/customer/info', { id }),
  /**
   * 获取客户列表
   */
  getCustomerList: ({ id }) => api.post('/customer/cusList', { id }),
  /**
   * 获取服务记录列表
   */
  getServiceList: ({ id }) => api.post('/customer/custServiceRecord', { id }),
};
