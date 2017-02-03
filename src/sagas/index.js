/**
 * @file sagas/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fork } from 'redux-saga/effects';
import globalSaga from './globalSaga';
import productSaga from './productSaga';
import customerSaga from './customerSaga';
import api from '../api';

export default function* root() {
  yield fork(globalSaga());
  yield fork(productSaga(api));
  yield fork(customerSaga(api));
}
