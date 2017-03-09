/**
 * @file models/tatusjs
 *  跨页面状态保持，如a页面tab index变化后，跳到b页面再回到a页面时，
 *  需保持原tab index状态, 此类变量全部在此文件维护
 * @author maoquan(maoquan@htsc.com)
 */

export default {
  namespace: 'status',
  state: {
    customerTabIndex: 0,
    customerDetailTabIndex: 0,
  },
  reducers: {
    changeCustomerTabIndex(state, { payload }) {
      return {
        ...state,
        customerTabIndex: payload,
      };
    },
    changeCustomerDetailTabIndex(state, { payload }) {
      return {
        ...state,
        customerDetailTabIndex: payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
