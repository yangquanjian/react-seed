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
    searchList: [],
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
    * save({ payload: { data } }, { call, put }) {
      const response = yield call(api.saveCustomer, { data });
      yield put({ type: 'saveSuccess', payload: { response } });
      yield put(routerRedux.goBack());
    },
    * search({ payload: { keyword, page } }, { put }) {
      // const response = yield call(api.searchCustomer, { keyword, page });
      const response = {
        data: [
          {
            id: '1',
            name: '张三',
            phone: '13852293972',
          },
          {
            id: '2',
            name: '李四',
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
        }
      });
    },
  },
};
