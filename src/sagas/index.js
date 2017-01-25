import { fork } from 'redux-saga/effects';
import globalSaga from './globalSaga';
import productSaga from './productSaga';
import api from '../api';

export default function* root() {
  yield fork(globalSaga());
  yield fork(productSaga(api));
}
