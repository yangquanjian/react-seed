/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { routerRedux } from 'dva/router'

import api from '../api';

export default {
  namespace: 'customer',
  state: fromJS({
    data: {},
  }),
  reducers: {
    fetchSuccess(state, action) {
      const { payload: { response } } = action;
      return state.set('data', fromJS(response.data));
    },
    saveSuccess(state, action) {
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
    * save({ payload: { data } }, { call, put }) {
      const response = yield call(api.saveCustomer, { data });
      yield put({ type: 'saveSuccess', payload: { response } });
      yield put(routerRedux.goBack());
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (/\/customer\/\d+/.test(pathname)) {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
