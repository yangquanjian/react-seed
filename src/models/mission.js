/**
 * @file models/mission.js
 * @author fengwencong
 */

import pathToRegexp from 'path-to-regexp';

import api from '../api';

export default {
  namespace: 'mission',
  state: {
    missionCenter: {},
  },
  reducers: {
    getCenterSuccess(state, action) {
      const { payload: { missionCenter } } = action;
      return {
        ...state,
        missionCenter: missionCenter.resultData,
      };
    },
  },
  effects: {
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
