import { take, put, call, fork } from 'redux-saga/effects';
import { productList } from '../actions/productActions';
import Constants from '../constants/Product';

export default (api) => {
  function* getProductList() {
    yield put(productList.request());
    try {
      const response = yield call(api.getProductList);
      yield put(productList.success(response));
    } catch (e) {
      yield put(productList.failure(e));
    }
  }

  function* watchGetProductList() {
    while (true) { // eslint-disable-line
      yield take(Constants.GET_PRODUCT_LIST);
      yield call(getProductList);
    }
  }

  function* watcher() {
    yield fork(watchGetProductList);
  }

  return watcher;
};
