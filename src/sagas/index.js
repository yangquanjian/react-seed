import { fork } from 'redux-saga/effects';
import productSaga from './productSaga';

export default function* root() {
  yield fork(productSaga());
}
