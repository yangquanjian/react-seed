/**
 * @file utils/createSagas
 * @author maoquan(maoquan@htsc.com)
 */

import { put, call } from 'redux-saga/effects';
import { delay } from './sagaEffects';

export default {};

/**
 * 生成发起ajax请求, 并处理ajax响应的generator函数
 */
export function createFetchGenerator(actions, fetchFunction) {
  return function* fetch(args) {
    yield put(actions.request(args));
    try {
      const response = yield call(fetchFunction, args);
      // mock延时，真实场景要去掉
      yield delay(500);
      yield put(actions.success({ response, ...args }));
    } catch (error) {
      yield put(actions.failure({ error, ...args }));
    }
  };
}
