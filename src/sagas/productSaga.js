import { take, put, call, fork } from 'redux-saga/effects';
import { actions as homeActions, constants as homeConstants } from '../views/product/HomeRedux';
import { delay } from '../utils/sagaEffects';

export default (api) => {
  function* getProductList() {
    yield put(homeActions.list.request());
    try {
      const response = yield call(api.getProductList);
      yield delay(1000);
      yield put(homeActions.list.success(response));
    } catch (e) {
      yield put(homeActions.list.failure(e));
    }
  }

  function* watchGetProductList() {
    while (true) { // eslint-disable-line
      yield take(homeConstants.list.LOAD);
      yield call(getProductList);
    }
  }

  function* watcher() {
    yield fork(watchGetProductList);
  }

  return watcher;
};
