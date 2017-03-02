/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Modal } from 'antd-mobile';
import _ from 'lodash';

import routerConfig from './router';
import persistConfig from './config/persist';
import FastClick from './utils/fastclick';
import { getQuery } from './utils/helper';
import { navToLogin } from './utils/cordova';
import api from './api';

const extraEnhancers = [];
if (persistConfig.active) {
  extraEnhancers.push(autoRehydrate());
}

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: createLogger(),
  extraEnhancers,
  onError(e) {
    console.log(e);
    const { message } = e;
    if (message === 'MAG0010') {
      Modal.alert(
        '错误',
        '登录超时，请重新登录！',
        [
          {
            text: '确定',
            onPress: navToLogin,
          },
        ],
      );
    } else {
      Modal.alert(message);
    }
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/product'));
app.model(require('./models/global'));
app.model(require('./models/customer'));
app.model(require('./models/search'));

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');

// 6. redux-persist
if (persistConfig.active) {
  persistStore(app._store, persistConfig); // eslint-disable-line
}

// fastclick
FastClick.attach(document.body);

// cordova
document.addEventListener('deviceready', () => {}, false);

// 存储empId, deviceId, token等授权信息
const query = getQuery(location.search);
const authInfo = _.pick(query, 'empId', 'deviceId', 'token');
api.setAuthInfo(authInfo);
