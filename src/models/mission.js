/**
 * @file models/product.js
 * @author maoquan(maoquan@htsc.com)
 */

import api from '../api';

export default {
  namespace: 'mission',
  state: {
    // 任务详情
    motDetail: {},
  },
  reducers: {
    // 获取任务详情成功
    getMotDetailSuccess(state, action) {
      const { payload: { response, motTaskId } } = action;
      return {
        ...state,
        motDetail: {
          [motTaskId]: response.resultData,
        },
      };
    },
  },
  effects: {
    // 获取任务详情
    * fetchMotDetail({ payload: { motTaskId = 1 } }, { call, put }) {
      const response = yield call(api.getMotDetail, { motTaskId });
      yield put({
        type: 'getMotDetailSuccess',
        payload: {
          response,
          motTaskId,
        },
      });
    },
  },
  subscriptions: {},
};
