/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

import api from '../api';

export default {
  namespace: 'customer',
  state: {
    data: {},
    detailInfo: {},
    basic: {},
    contact: {},
    contactList: {},
    serviceList: {},
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
      const { payload: { list, refresh } } = action;
      const { page = {}, resultList: newData } = list.resultData;
      const oldResult = refresh ? [] : state.list.resultList;
      if (_.isEmpty(newData) && !refresh) {
        return state;
      }
      return {
        ...state,
        list: {
          page,
          resultList: [...oldResult, ...newData],
        },
      };
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
    * getServiceList({ payload: { custSor = 'per', custId = 1 } }, { call, put }) {
      const response = yield call(api.getServiceList, { custSor, custId });
      yield put({
        type: 'getServiceListSuccess',
        payload: {
          response,
          custSor,
          custId,
        },
      });
    },
    * getList({ payload: {
        custQueryType = 'personal',
        keywords = '',
        custNature = '',
        custType = '',
        custLevel = '',
        riskLevel = '',
        accountStatus = '',
        orderType = 'desc',
        pageSize = 10,
        pageNum = 1,
        openDateStart = '',
        openDateEnd = '',
        refresh = false,
      } }, { call, put }) {
      const list = yield call(
        api.getCustomerList,
        {
          custQueryType,
          keywords,
          custNature,
          custType,
          custLevel,
          riskLevel,
          accountStatus,
          orderType,
          pageSize,
          pageNum,
          openDateStart,
          openDateEnd,
        },
      );
      yield put({
        type: 'getListSuccess',
        payload: {
          list,
          refresh,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
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
        // 服务记录列表
        const serviceListMatch = pathToRegexp('/serviceList/:custSor/:custId').exec(pathname);
        if (serviceListMatch) {
          const custSor = serviceListMatch[1];
          const custId = serviceListMatch[1];
          dispatch({ type: 'getServiceList', payload: { custSor, custId } });
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
