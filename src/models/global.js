/**
 * @file models/global.js
 * @author maoquan(maoquan@htsc.com)
 */

import { navToLogin } from '../utils/cordova';
import api from '../api';

export default {
  namespace: 'global',
  state: {
    token: '',
    empInfo: {},
  },
  reducers: {
    getTokenSuccess(state, action) {
      // 客户基本信息
      const { payload: { token } } = action;
      return {
        ...state,
        token,
      };
    },
    getEmpInfoSuccess(state, action) {
      // 用户信息
      const { payload: { empInfo } } = action;
      return {
        ...state,
        empInfo,
      };
    },
  },
  effects: {
    // 登出
    * logout({ payload: query }, { call }) {
      yield call(api.logout, query);
      navToLogin();
    },
    // 获取token(for dev)
    * getToken({ payload: { empId, deviceId } }, { call, put }) {
      try {
        yield call(api.sendSmsCheckCode, { empId });
      } catch (e) {
        console.log(e);
      }
      const response = yield call(api.login, { deviceId, empId });
      if (response.resultData) {
        const { token } = response.resultData;
        yield put({
          type: 'getTokenSuccess',
          payload: {
            token,
          },
        });
      }
    },
    // 获取员工信息
    * getEmpInfo({ payload }, { call, put }) {
      const response = yield call(api.getEmpInfo);
      if (response.resultData) {
        const empInfo = response.resultData;
        yield put({
          type: 'getEmpInfoSuccess',
          payload: {
            empInfo,
          },
        });
      }
    },
  },
  subscriptions: {},
};
