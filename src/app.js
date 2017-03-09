/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import createSensorsLogger from './middlewares/sensorsLogger';
import routerConfig from './router';
import persistConfig from './config/persist';
import FastClick from './utils/fastclick';
import { getQuery } from './utils/helper';
import { navToLogin } from './utils/cordova';
import api from './api';

// 存储empId, deviceId, token等授权信息
const query = getQuery(location.search);
const authInfo = _.pick(query, 'empId', 'deviceId', 'token');
api.setAuthInfo(authInfo);

const extraEnhancers = [];
if (persistConfig.active) {
  extraEnhancers.push(autoRehydrate());
}

const getMessage = (message) => {
  if (message === 'Failed to fetch') {
    return '网络异常';
  }
  return message;
};

// 错误处理
const onError = (e) => {
  const { message } = e;
  if (message === 'MAG0010') {
    Toast.fail(
      '登录超时，请重新登录！',
      2,
      navToLogin,
    );
  } else {
    Toast.fail(getMessage(message));
  }
};

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: [createLogger(), createSensorsLogger()],
  extraEnhancers,
  onError,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/product'));
app.model(require('./models/global'));
app.model(require('./models/customer'));
app.model(require('./models/mission'));
app.model(require('./models/search'));
app.model(require('./models/status'));

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');

// 6. redux-persist
if (persistConfig.active) {
  persistStore(app._store, persistConfig); // eslint-disable-line
}

// 获取客户信息
app._store.dispatch({ type: 'global/getEmpInfo' }); // eslint-disable-line

// fastclick
FastClick.attach(document.body);

// cordova
document.addEventListener('deviceready', () => {}, false);
