/**
 * @file models/product.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';

import api from '../api';

export default {
  namespace: 'mission',
  state: {
    // 任务详情
    motDetail: [],
  },
  reducers: {
    // 获取任务详情成功
    getMotDetailSuccess(state, action) {
      const { payload: { response, motTaskId } } = action;
      return {
        ...state,
        motDetail: {
          [motTaskId]: response,
        },
      };
    },
  },
  effects: {
    // 获取任务详情
    * fetchMotDetail({ payload: { motTaskId = 1, pageNum = 1, pageSize = 10 } }, { call, put }) {
      const response = yield call(api.getMotDetail, { motTaskId, pageNum, pageSize });
      yield put({
        type: 'getMotDetailSuccess',
        payload: {
          response,
          motTaskId,
          pageNum,
          pageSize,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // 任务详情
        const motDetailMatch = pathToRegexp('/taskDetail/:motTaskId').exec(pathname);
        if (motDetailMatch) {
          const motTaskId = motDetailMatch[1];
          dispatch({ type: 'fetchMotDetail', payload: { motTaskId } });
        }
      });
    },
  },
};
