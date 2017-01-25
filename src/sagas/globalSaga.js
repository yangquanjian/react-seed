import { take, put, call, fork } from 'redux-saga/effects';
import { showLoading, hideLoading } from '../actions/globalActions';
import Constants from '../constants/Global';
import { delay } from '../utils/sagaEffects';

export default () => {

  // 显示Loading，同时设定超时时间
  function *showSafety() {
    yield put(showLoading())
    yield delay(20000)
    yield put(hideLoading())
  }

  function * watchRequest () {
    while (true) {
      const action = yield take('*')
      if (/_SUCCESS$/.test(action.type) || /_FAILURE$/.test(action.type)) {
        yield put(hideLoading())
      }
      if (/_REQUEST$/.test(action.type) && action.loading !== false) {
        // 为了不阻塞继续监听后续请求，这里要fork
        yield fork(showSafety)
      }
      else if (action.loading === true) {
        yield fork(showSafety)
      }
    }
  }

  function* watcher() {
    yield fork(watchRequest);
  }

  return watcher;
};
