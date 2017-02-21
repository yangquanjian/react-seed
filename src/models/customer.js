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
        const custBasicMatch = pathToRegexp('/custBasic/:type/:id').exec(pathname);
        const custContactMatch = pathToRegexp('/custContact/:id').exec(pathname);
        const custMatch = pathToRegexp('/customer').exec(pathname);

        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: { id } });
        }

        if (custBasicMatch) {
          const id = custBasicMatch[2];
          const type = custBasicMatch[1];
          if (type === 'per') {
            dispatch({ type: 'getPerBasic', payload: { id } });
          } else {
            dispatch({ type: 'getOrgBasic', payload: { id } });
          }
        }

        if (custContactMatch) {
          const id = custContactMatch[1];
          dispatch({ type: 'getPerContact', payload: { id } });
        }

        if (custMatch) {
          const id = custMatch[1];
          dispatch({ type: 'getInfo', payload: { id } });
        }
      });
    },
  },
};
