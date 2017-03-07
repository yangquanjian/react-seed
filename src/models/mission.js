/**
 * @file models/customer.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';

import api from '../api';

export default {
  namespace: 'mission',
  state: {
    // 任务详情介绍
    taskDesc: {},
    // 任务客户列表
    taskCustList: {
      page: {},
      resultList: [],
    },
  },
  reducers: {
    // 获取任务详情成功
    getTaskDetailSuccess(state, action) {
      const { payload: { response, motTaskId } } = action;
      return {
        ...state,
        taskDesc: {
          [motTaskId]: response.resultData,
        },
      };
    },
  },
  effects: {
    // 获取任务详情
    * getTaskDetail({ payload: { motTaskId = 1 } }, { call, put }) {
      const response = yield call(api.getTaskDetail, { motTaskId });
      yield put({
        type: 'getTaskDetailSuccess',
        payload: {
          response,
          motTaskId,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // 任务详情
        const taskDetailMatch = pathToRegexp('/taskDetail/:motTaskId').exec(pathname);
        if (taskDetailMatch) {
          const motTaskId = taskDetailMatch[1];
          dispatch({ type: 'getTaskDetail', payload: { motTaskId } });
        }
      });
    },
  },
};
