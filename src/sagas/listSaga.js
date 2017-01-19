import { take, put, call, fork } from 'redux-saga/effects';

import Types from '../constants/List';
import * as listActions from '../actions/listActions';

export default (request) => {
  function* getListData(query) {
    const { entity } = query;
    yield put(listActions.getListDataRequest());
    try {
      const response = yield call(request, `/api/${entity}/list`);
      yield put(listActions.getListDataRequestSuccess({ entity, data: response }));
    } catch (e) {
      yield put(listActions.getListDataRequestFailure(e));
    }
  }

  function* watchGetListData() {
    while (true) { // eslint-disable-line
      const { payload } = yield take(Types.GET_LIST_DATA);
      yield call(getListData, payload);
    }
  }

  function* watcher() {
    yield fork(watchGetListData);
  }

  return {
    watcher,
  };
};
