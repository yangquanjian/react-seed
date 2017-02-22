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
    chartInfo: [],
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
    * fetchCustDetail({ payload: { custId = 1 } }, {call, put}) {
      const response = yield call(api.getCustomerDetail, { custId });
      yield put({
        type: 'fetchCustDetailSuccess',
        payload: {
          response,
          custId
        }
      })
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

        const custMatch = pathToRegexp('/customer').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: { id } });
        }
        if (custMatch) {
          const id = custMatch[1];
          dispatch({ type: 'getInfo', payload: { id } });
        }
      });
    },
  },
};
