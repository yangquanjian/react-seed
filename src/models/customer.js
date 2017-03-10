/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';

import api from '../api';

export default {
  namespace: 'customer',
  state: {
    data: {},
    // 客户详情
    detailInfo: {},
    // 客户基本信息
    basic: {},
    // 个人客户联系方式
    contact: {},
    // 机构客户联系人列表
    contactList: {},
    // 服务信息列表
    serviceList: {},
    info: {},
    // 客户首页列表
    list: {
      page: {},
      resultList: [],
    },
  },
  reducers: {
    getBasicSuccess(state, action) {
      // 客户基本信息
      const { payload: { response, custId } } = action;
      return {
        ...state,
        basic: {
          [custId]: response.resultData,
        },
      };
    },
    getContactSuccess(state, action) {
      // 个人客户联系方式
      const { payload: { response, custId } } = action;
      return {
        ...state,
        contact: {
          [custId]: response.resultData,
        },

      };
    },
    getContactListSuccess(state, action) {
      // 机构客户联系人
      const { payload: { response, custId } } = action;
      return {
        ...state,
        contactList: {
          [custId]: response.resultData,
        },
      };
    },
    getServiceListSuccess(state, action) {
      // 服务记录列表
      const { payload: { response, custId, custSor } } = action;
      return {
        ...state,
        serviceList: {
          ...state.serviceList,
          [custId]: {
            ...response.resultData,
            custId,
            custSor,
          },
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
      const { page = {}, resultList: newData = [] } = list.resultData || {};
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
    // 获取客户详情成功
    fetchCustDetailSuccess(state, action) {
      const { payload: { response, custId, custNumber, custSor } } = action;
      return {
        ...state,
        detailInfo: {
          ...state.detailInfo,
          [custId]: {
            ...response.resultData,
            custId,
            custNumber,
            custSor,
          },
        },
      };
    },
  },
  effects: {
    * getInfo({ payload: {
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
    } }, { call, put }) {
      const [info, list] = yield [
        call(api.getCustomerInfo),
        call(api.getCustomerList, {
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
        }),
      ];
      yield put({
        type: 'getInfoSuccess',
        payload: {
          info,
          list,
        },
      });
    },
    // 获取客户详情
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
  subscriptions: {},
};
