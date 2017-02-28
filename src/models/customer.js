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
    basicInfo: {},
    searchList: [],
    basic: {},
    contact: {},
    serviceList: {},
    searchInfo: {
      page: {},
      list: [],
    },
    info: {},
    list: [],
    recommendList: [],
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
    fetchCustBasicSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          ...response.data,
          custId,
        },
      };
    },
    fetchRecommendProductSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return {
        ...state,
        recommendList: [
          ...state.recommendList,
          ...response.resultData,
          custId,
        ],
      };
    },
    ignoreProductSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return {
        ...state,
        ignoreResult: {
          ...state.ignoreResult,
          ...response.data,
          custId,
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
    * fetchBasicInfo({ payload: { custId = 1 } }, { call, put }) {
      const response = yield call(api.getCustomerBasicInfo, { custId });
      yield put({
        type: 'fetchCustBasicSuccess',
        payload: {
          response,
          custId,
        },
      });
    },
    * fetchRecommendProductList({ payload: { custId = 1 } }, { call, put }) {
      const response = yield call(api.getRecommendProductList, { custId });
      yield put({
        type: 'fetchRecommendProductSuccess',
        payload: {
          response,
          custId,
        },
      });
    },
    * ignoreProduct({ payload: { custId = 1 } }, { call, put }) {
      const response = yield call(api.ignoreProduct, { custId });
      yield put({
        type: 'ignoreProductSuccess',
        payload: {
          response,
          custId,
        },
      });
      /* 不合适成功之后，重新去拉取推荐产品列表数据 */
      yield put({
        type: 'fetchRecommendProductList',
        payload: {
          response,
          custId,
        },
      });
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
        const custMatch = pathToRegexp('/customer').exec(pathname);

        const matchDetail = pathToRegexp('/customer/detail').exec(pathname);

        // 客户首页
        const custBasicMatch = pathToRegexp('/custBasic/:custNumber/:custSor/:custId').exec(pathname);
        const custContactMatch = pathToRegexp('/custContact/:custNumber').exec(pathname);
        const serviceListMatch = pathToRegexp('/serviceList/:custNumber').exec(pathname);

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
        // 客户详情
        if (custMatch) {
          const id = custMatch[1];
          dispatch({ type: 'getInfo', payload: { id } });
        }

        if (matchDetail) {
          const { custId, custNumber, custSor } = query;
          dispatch({ type: 'fetchCustDetail', payload: { custId, custNumber, custSor } });
          // dispatch({ type: 'fetchRecommendProductList', payload: { custId } });
        }
      });
    },
  },
};
