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
    chartInfo: []
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
    saveSuccess(state, action) {// eslint-disable-line
      // 做一些表单保存成功后的处理
      return state;
    },
    fetchCustDetailSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return state.set('detailInfo', fromJS(Object.assign(response.data, custId)));
    },
    fetchCustBasicSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return state.set('basicInfo', fromJS(Object.assign(response.data, custId)));
    },
    fetchCustChartSuccess(state, action) {
      const { payload: { response, custId } } = action;
      return state.set('chartInfo', response.data);
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
    * fetchCustDetail({ payload: { custId = 1 } }, {call, put}) {
      const response = yield call(api.getCustomerDetail, { custId });
      yield put({
        type: 'fetchCustDetailSuccess',
        payload: {
          response,
          custId
        }
      });
    },
    * save({ payload: { data } }, { call, put }) {
      const response = yield call(api.saveCustomer, { data });
      yield put({ type: 'saveSuccess', payload: { response } });
      yield put(routerRedux.goBack());
    },
    * fetchBasicInfo({ payload: { custId = 1 }}, { call, put }) {
      const response = yield call(api.getCustomerBasicInfo, { custId });
      yield put({
        type: 'fetchCustBasicSuccess',
        payload: {
          response,
          custId
        }
      });
    },
    * fetchChartInfo({ payload: { custId = 1 }}, { call, put }) {
      const response = yield call(api.getCustomerChartInfo, { custId });
      yield put({
        type: 'fetchCustChartSuccess',
        payload: {
          response,
          custId
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/customer/:id').exec(pathname);
        const matchDetail = pathToRegexp('/customer/detail').exec(pathname);

        const matchBasic = pathToRegexp('/customer/basicInfo').exec(pathname);

        if (matchDetail) {
          const id = matchDetail[1];
          dispatch({ type: 'fetchCustDetail', payload: { id } });
          dispatch({ type: 'fetchChartInfo', payload: { id } });
        }

        if (matchBasic) {
          const id = matchBasic[1];
          dispatch({ type: 'fetchBasicInfo', payload: { id } });
        }

        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: { id } });
        }
      });
    },
  },
};
