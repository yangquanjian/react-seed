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
   * 获取客户信息
   */
  getCustomerInfo: ({ id }) => api.get('/customer/info', { id }),
  /**
   * 获取客户列表
   */
  getCustomerList: ({ id }) => api.get('/customer/cusList', { id }),
  /**
   * 获取客户详细信息
   */
  getCustomerDetail: ({ id }) => api.get('/customer/detail', { id }),
  /**
   * 获取客户基本信息
   */
  getCustomerBasicInfo: ({ id }) => api.get('/customer/basic', { id }),
  /**
   * 获取客户收益折线图
   */
  getCustomerChartInfo: ({ id }) => api.get('/customer/chart', { id }),
};
