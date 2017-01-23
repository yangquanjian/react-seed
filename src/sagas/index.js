import { fork } from 'redux-saga/effects';
import productSaga from './productSaga';
import api from '../api';

export default function* root() {
  yield fork(productSaga(api));
}
