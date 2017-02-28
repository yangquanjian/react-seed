/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

import api from '../api';

export default {
  namespace: 'customer',
  state: {
    data: {},
    basic: {},
    contact: {},
    serviceList: {},
    searchInfo: {
      page: {},
      list: [],
    },
    info: {},
    list: {},
  },
  reducers: {
    getBasicSuccess(state, action) {
      // 客户基本信息
      const { payload: { response } } = action;
      return {
        ...state,
        basic: {
          ...state.data,
          ...response.data,
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
          ...response.data,
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
          ...response.data,
        },
      };
    },
    getInfoSuccess(state, action) {
      const { payload: { info, list } } = action;
      return {
        ...state,
        info: {
          ...info.resultData,
        },
        list: list.resultData,
      };
    },
    getListSuccess(state, action) {
      const { payload: { list } } = action;
      const { resultData: { page, resultList:  newData } } = list;
      const oldResult = state.list.resultList;
      return {
        ...state,
        list: {
          page,
          resultList: [...newData, ...oldResult],
        },
      };
    },
    saveSuccess(state, action) {// eslint-disable-line
      // 做一些表单保存成功后的处理
      return state;
    },
    searchSuccess(state, { payload: { response, query } }) {// eslint-disable-line
      const { resultData: { page, resultList } } = response;
      // 如果page为1表示新刷新，这时候清空之前的列表
      const originList = page.curPageNum === 1 ? [] : state.searchInfo.list;
      return {
        ...state,
        searchInfo: {
          page,
          list: [...originList, ...resultList],
        },
      };
    },
  },
  effects: {
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
        type: 'getInfoSuccess',
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
    // 搜索客户
    * search({ payload: query }, { call, put }) {
      const { keywords, custQueryType, page = 1 } = query;
      const response = yield call(api.searchCustomer, { keywords, custQueryType, page });
      yield put({ type: 'searchSuccess', payload: { response, query } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const custBasicMatch = pathToRegexp('/custBasic/:custNumber/:custSor/:custId').exec(pathname);
        const custContactMatch = pathToRegexp('/custContact/:custNumber').exec(pathname);
        const serviceListMatch = pathToRegexp('/serviceList/:custNumber').exec(pathname);
        const custMatch = pathToRegexp('/customer').exec(pathname);

        if (pathname === '/customer/searchResult') {
          const { keyword, custQueryType, page = 1 } = query;
          dispatch({ type: 'search', payload: { keyword, custQueryType, page } });
          return;
        }

        if (custBasicMatch) {
          const custNumber = custBasicMatch[1];
          const custSor = custBasicMatch[2];
          const custId = custBasicMatch[3];
          if (custSor === 'per') {
            dispatch({ type: 'getPerBasic', payload: { custNumber, custSor, custId } });
          } else {
            dispatch({ type: 'getOrgBasic', payload: { custNumber, custSor, custId } });
          }
        }
        // 个人客户联系方式
        if (custContactMatch) {
          const id = custContactMatch[1];
          dispatch({ type: 'getPerContact', payload: { id } });
        }
        // 服务列表
        if (serviceListMatch) {
          const id = serviceListMatch[1];
          dispatch({ type: 'getServiceList', payload: { id } });
        }
        //客户首页
        const custMatch = pathToRegexp('/customer').exec(pathname);
        if (custMatch) {
          const id = custMatch[1];
          dispatch({ type: 'getInfo', payload: { id } });
          return;
        }
      });
    },
  },
};
