/**
 * @file models/global.js
 * @author maoquan(maoquan@htsc.com)
 */

import { navToLogin } from '../utils/cordova';
import api from '../api';

export default {
  namespace: 'global',
  state: {
  },
  reducers: {},
  effects: {
    * logout({ payload: query }, { call }) {
      yield call(api.logout, query);
      navToLogin();
    },
  },
  subscriptions: {},
};
