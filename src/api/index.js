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
   * { keywords, page, custQueryType }
   */
  searchCustomer: query => api.post('/groovy/cust/custList', query),
  /**
   * 保存客户信息
   */
  saveCustomer: ({ data }) => api.post('/customer/save', data),

  /**
   * 查询客户基本信息
   */
  getCustBasic: ({ custNumber, custSor, custId }) => api.post('/groovy/cust/custBaseInfo', { custNumber, custSor, custId }),
  /**
   * 查询客户联系方式
   */
  getCustCotact: ({ custNumber, custSor, custId }) => api.post('/groovy/cust/custContact', { custNumber, custSor, custId }),
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
  getServiceList: ({ id }) => api.post('/groovy/cust/custServiceRecord', { id }),
  /**
   * 登出
   * {}
   */
  logout: query => api.post('/mobile/logout', query),
};
