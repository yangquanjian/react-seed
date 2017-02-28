/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

import { delay } from '../utils/sagaEffects';
import api from '../api';

export default {
  namespace: 'customer',
  state: {
    data: {},
    basic: {},
    contact: {},
    contactList: {},
    serviceList: {},
    searchList: [],
    info: {},
    list: [],
  },
  reducers: {
    fetchSuccess(state, action) {
      const { payload: { response } } = action;
      return {
        ...state,
        data: {
          ...state.data,
          ...response.data,
        },
      };
    },
    getBasicSuccess(state, action) {
      // 客户基本信息
      const { payload: { response } } = action;
      return {
        ...state,
        basic: {
          ...state.data,
          ...response.resultData,
        },
      };
    },
    getContactSuccess(state, action) {
      // 个人客户联系方式
      const { payload: { response } } = action;
      return {
        ...state,
        contact: {
          ...state.data,
          ...response.resultData,
        },
      };
    },
    getContactListSuccess(state, action) {
      // 机构客户联系方式
      const { payload: { response } } = action;
      return {
        ...state,
        contactList: {
          ...state.data,
          ...response.resultData,
        },
      };
    },
    getServiceListSuccess(state, action) {
      // 服务记录列表
      const { payload: { response } } = action;
      return {
        ...state,
        serviceList: {
          ...state.data,
          ...response.resultData,
        },
      };
    },
    getSuccess(state, action) {
      const { payload: { info, list } } = action;
      return {
        ...state,
        info: {
          ...info.data,
        },
        list: list.data,
      };
    },
    getListSuccess(state, action) {
      const { payload: { list } } = action;
      return {
        ...state,
        list: [...state.list, ...list.data],
      };
    },
    saveSuccess(state, action) {// eslint-disable-line
      // 做一些表单保存成功后的处理
      return state;
    },
    searchSuccess(state, { payload: { response } }) {// eslint-disable-line
      return {
        ...state,
        searchList: response.data,
      };
    },
  },
  effects: {
    * fetch({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getCustomer, { id });
      yield put({
        type: 'fetchSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getPerBasic({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getPerCustBasic, { id });
      yield put({
        type: 'getBasicSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getInfo({ payload: { id = 2 } }, { call, put }) {
      const [info, list] = yield [
        call(api.getCustomerInfo, { id }),
        call(api.getCustomerList, { id }),
      ];
      yield put({
        type: 'getSuccess',
        payload: {
          info,
          list,
          id,
        },
      });
    },
    * getOrgBasic({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getOrgCustBasic, { id });
      yield put({
        type: 'getBasicSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getPerContact({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getPerCustCotact, { id });
      yield put({
        type: 'getContactSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getOrgContact({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getOrgCustCotact, { id });
      yield put({
        type: 'getContactListSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getServiceList({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getServiceList, { id });
      yield put({
        type: 'getServiceListSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * getList({ payload: { id = 3 } }, { call, put }) {
      const list = yield call(api.getCustomerList, { id });
      yield put({
        type: 'getListSuccess',
        payload: {
          list,
          id,
        },
      });
    },
    * save({ payload: { data } }, { call, put }) {
      const response = yield call(api.saveCustomer, { data });
      yield put({ type: 'saveSuccess', payload: { response } });
      yield put(routerRedux.goBack());
    },
    * search({ payload: { keyword, page, cusType } }, { put }) {
      // const response = yield call(api.searchCustomer, { keyword, page });
      yield delay(1000);
      const response = {
        data: [
          {
            id: '1',
            name: `张三${new Date().getTime()}`,
            phone: '13852293972',
          },
          {
            id: '2',
            name: `李四${new Date().getTime()}`,
            phone: '17705188176',
          },
        ],
      };
      yield put({ type: 'searchSuccess', payload: { response } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/customer/:id').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: { id } });
          return;
        }
        // 客户详情页面
        const custBasicMatch = pathToRegexp('/custBasic/:custNumber/:custSor/:custId').exec(pathname);
        if (custBasicMatch) {
          const custNumber = custBasicMatch[1];
          const custSor = custBasicMatch[2];
          const custId = custBasicMatch[3];
          if (custSor === 'per') {
            dispatch({ type: 'getPerBasic', payload: { custNumber, custSor, custId } });
            return;
          }
          dispatch({ type: 'getOrgBasic', payload: { custNumber, custSor, custId } });
          return;
        }
        // 个人客户联系方式
        const custContactPerMatch = pathToRegexp('/custContactPer/:custNumber').exec(pathname);
        if (custContactPerMatch) {
          const id = custContactPerMatch[1];
          dispatch({ type: 'getPerContact', payload: { id } });
          return;
        }
        // 机构客户联系方式
        const custContactOrgMatch = pathToRegexp('/custContactOrg/:custNumber').exec(pathname);
        if (custContactOrgMatch) {
          const id = custContactOrgMatch[1];
          dispatch({ type: 'getOrgContact', payload: { id } });
          return;
        }
        // 服务列表
        const serviceListMatch = pathToRegexp('/serviceList/:custNumber').exec(pathname);
        if (serviceListMatch) {
          const id = serviceListMatch[1];
          dispatch({ type: 'getServiceList', payload: { id } });
          return;
        }
        // 客户详情
        const custMatch = pathToRegexp('/customer').exec(pathname);
        if (custMatch) {
          const id = custMatch[1];
          dispatch({ type: 'getInfo', payload: { id } });
        }
      });
    },
  },
};
