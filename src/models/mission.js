/**
 * @file models/mission.js
 * @author fengwencong
 */

import pathToRegexp from 'path-to-regexp';
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
    getCenterSuccess(state, action) {
      const { payload: { missionCenter } } = action;
      return {
        ...state,
        missionCenter: missionCenter.resultData,
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
    * getCenter({ payload }, { call, put }) {
      const missionCenter = yield call(api.getMissionCenter);
      yield put({
        type: 'getCenterSuccess',
        payload: {
          missionCenter,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // 任务中心
        const centerMatch = pathToRegexp('/mission').exec(pathname);
        if (centerMatch) {
          dispatch({ type: 'getCenter' });
        }
      });
    },
  },
};
