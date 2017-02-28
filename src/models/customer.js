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
    detailInfo: {},
    searchList: [],
    basic: {},
    contact: {},
    contactList: {},
    serviceList: {},
    searchInfo: {
      page: {},
      list: [],
    },
    info: {},
    list: {
      page: {},
      resultList: [],
    },
  },
  reducers: {
    getBasicSuccess(state, action) {
      // 客户基本信息
      const { payload: { response } } = action;
      return {
        ...state,
        basic: response.resultData,
      };
    },
    getContactSuccess(state, action) {
      // 个人客户联系方式
      const { payload: { response } } = action;
      return {
        ...state,
        contact: response.resultData,

      };
    },
    getContactListSuccess(state, action) {
      // 机构客户联系人
      const { payload: { response } } = action;
      return {
        ...state,
        contactList: response.resultData,
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
      const { page = [], resultList: newData } = list.resultData;
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
    fetchCustDetailSuccess(state, action) {
      const { payload: { response, custId, custNumber, custSor } } = action;
      return {
        ...state,
        detailInfo: {
          ...state.detailInfo,
          ...response.resultData,
          custId,
          custNumber,
          custSor,
        },
      };
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
    * getInfo({ payload: {
      custQueryType = 'personal',
      orderType = 'desc',
      pageSize = 10,
      pageNum = 1,
    } }, { call, put }) {
      const [info, list] = yield [
        call(api.getCustomerInfo),
        call(api.getCustomerList, { custQueryType, orderType, pageSize, pageNum }),
      ];
      yield put({
        type: 'getInfoSuccess',
        payload: {
          info,
          list,
        },
      });
    },
    * fetchCustDetail({ payload: { custId = 1, custNumber = 1, custSor = 'per' } }, { call, put }) {
      const response = yield call(api.getCustomerDetail, { custId, custNumber, custSor });
      yield put({
        type: 'fetchCustDetailSuccess',
        payload: {
          response,
          custId,
          custNumber,
          custSor,
        },
      });
    },
    * getCustBasic({ payload: { custNumber = 1, custSor = 'per', custId = 1 } }, { call, put }) {
      const response = yield call(api.getCustBasic, { custNumber, custSor, custId });
      console.log(response);
      yield put({
        type: 'getBasicSuccess',
        payload: {
          response,
          custNumber,
          custSor,
          custId,
        },
      });
    },
    * getPerContact({ payload: { custNumber = 1, custSor = 'per', custId = 1 } }, { call, put }) {
      const response = yield call(api.getCustCotact, { custNumber, custSor, custId });
      yield put({
        type: 'getContactSuccess',
        payload: {
          response,
          custNumber,
          custSor,
          custId,
        },
      });
    },
    * getOrgContact({ payload: { custNumber = 1, custSor = 'org', custId = 1 } }, { call, put }) {
      const response = yield call(api.getCustCotact, { custNumber, custSor, custId });
      yield put({
        type: 'getContactListSuccess',
        payload: {
          response,
          custNumber,
          custSor,
          custId,
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
    * getList({ payload: {
      custQueryType = 'personal',
      orderType = 'desc',
      pageSize = 10,
      pageNum = 1,
    } }, { call, put }) {
      const list = yield call(api.getCustomerList, { custQueryType, orderType, pageSize, pageNum });
      yield put({
        type: 'getListSuccess',
        payload: {
          list,
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
      const { keyword: keywords, custQueryType, page: pageNum = 1 } = query;
      const response = yield call(
        api.searchCustomer,
        { keywords, custQueryType, pageNum, pageSize: 20 },
      );
      yield put({ type: 'searchSuccess', payload: { response, query } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // 搜索页面
        if (pathname === '/customer/searchResult') {
          const { keyword, custQueryType, page = 1 } = query;
          dispatch({ type: 'search', payload: { keyword, custQueryType, page } });
          return;
        }
        // 客户基本信息页面
        const custBasicMatch = pathToRegexp('/custBasic/:custNumber/:custSor/:custId').exec(pathname);
        if (custBasicMatch) {
          const custNumber = custBasicMatch[1];
          const custSor = custBasicMatch[2];
          const custId = custBasicMatch[3];
          dispatch({ type: 'getCustBasic', payload: { custNumber, custSor, custId } });
          return;
        }
        // 个人客户联系方式
        const custContactPerMatch = pathToRegexp('/custContactPer/:custNumber/:custSor/:custId').exec(pathname);
        if (custContactPerMatch) {
          const custNumber = custContactPerMatch[1];
          const custSor = custContactPerMatch[2];
          const custId = custContactPerMatch[3];
          dispatch({ type: 'getPerContact', payload: { custNumber, custSor, custId } });
          return;
        }
        // 机构客户联系人
        const custContactOrgMatch = pathToRegexp('/custContactOrg/:custNumber/:custSor/:custId').exec(pathname);
        if (custContactOrgMatch) {
          const custNumber = custContactOrgMatch[1];
          const custSor = custContactOrgMatch[2];
          const custId = custContactOrgMatch[3];
          dispatch({ type: 'getOrgContact', payload: { custNumber, custSor, custId } });
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
        const matchDetail = pathToRegexp('customer/detail').exec(pathname);
        if (matchDetail) {
          const { custId, custNumber, custSor } = query;
          dispatch({ type: 'fetchCustDetail', payload: { custId, custNumber, custSor } });
          // dispatch({ type: 'fetchRecommendProductList', payload: { custId } });
        }
      });
    },
  },
};
