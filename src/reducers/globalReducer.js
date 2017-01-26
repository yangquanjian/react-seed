/**
 * @file reducers/globalReducer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import Constants from '../constants/Global';

// 显示Loading进度条
const showLoading = (state, action) => state.set('loading', true);
// 隐藏Loading进度条
const hideLoading = (state, action) => state.set('loading', false);

const INITIAL_STATE = fromJS({
  loading: false,
});

const ACTION_HANDLERS = {
  [Constants.SHOW_LOADING]: showLoading,
  [Constants.HIDE_LOADING]: hideLoading,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
