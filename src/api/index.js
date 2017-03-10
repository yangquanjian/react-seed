import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {

  /**
   * 暴露api上的几个底层方法: get / post / setAuthInfo
   */
  ...api,

  /**
   * 获取用户信息
   */
  getEmpInfo: () => api.post('/groovy/emp/empInfo'),

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
  getCustomerInfo: () => api.post('/groovy/cust/home'),

  /**
   * 获取客户列表
   */
  getCustomerList: query => api.post('/groovy/cust/custList', query),

  /**
   * 获取客户详细信息
   */
  getCustomerDetail: ({ custNumber, custSor, custId }) => api.post('/groovy/cust/custDetail', { custNumber, custSor, custId }),

  /**
   * 获取服务记录列表
   */
  getServiceList: ({ custSor, custId }) => api.post('/groovy/cust/custServiceRecord', { custSor, custId }),

  /**
   * 获取任务详情
   */
  getMotDetail: ({ motTaskId }) => api.post('/groovy/emp/motDetail', { motTaskId }),

  /**
   * 获取客户信息
   */
  getMissionCenter: () => api.post('/groovy/emp/motList'),

  /**
   * 登出
   * {}
   */
  logout: query => api.post('/mobile/logout', query),

  /**
   * 发送验证码
   */
  sendSmsCheckCode: ({ empId }) => api.post('/mobile/sendSmsCheckCode', { empId }),

  /**
   * 登录
   */
  login: ({ deviceId, empId }) => api.post(
    '/mobile/login',
    {
      deviceId,
      empId,
      checkCode: '123456',
      password: '123456',
    },
  ),
};
