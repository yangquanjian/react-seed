import { fork } from 'redux-saga/effects';
import listSaga from './listSaga';
import request from '../utils/request';

export default function* root() {
  yield fork(listSaga(request).watcher);
}
