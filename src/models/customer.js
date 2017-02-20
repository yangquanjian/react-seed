/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

import api from '../api';

export default {
  namespace: 'customer',
  state: fromJS({
    data: {},
    basicData: {},
  }),
  reducers: {
    fetchSuccess(state, action) {
      const { payload: { response } } = action;
      return state.set('data', fromJS(response.data));
    },
    getBasicSuccess(state, action) {
      // 客户基本信息
      const { payload: { response } } = action;
      return state.set('basicData', fromJS(response.data));
    },
    saveSuccess(state, action) {// eslint-disable-line
      // 做一些表单保存成功后的处理
      return state;
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
    * getBasic({ payload: { id = 1 } }, { call, put }) {
      const response = yield call(api.getCustBasic, { id });
      yield put({
        type: 'getBasicSuccess',
        payload: {
          response,
          id,
        },
      });
    },
    * save({ payload: { data } }, { call, put }) {
      const response = yield call(api.saveCustomer, { data });
      yield put({ type: 'saveSuccess', payload: { response } });
      yield put(routerRedux.goBack());
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/customer/:id').exec(pathname);
        const custBasicMatch = pathToRegexp('/custBasic/:id').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: { id } });
        }
        if (custBasicMatch) {
          const id = custBasicMatch[1];
          dispatch({ type: 'getBasic', payload: { id } });
        }
      });
    },
  },
};
