/**
 * @file redux/global.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { createReducer, createTypes } from 'reduxsauce';

/**
 * constants
 */
export const constants = createTypes(`
  SHOW_LOADING
  HIDE_LOADING
`);

/**
 * actions
 */
export const showLoading = () => ({
  type: constants.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: constants.HIDE_LOADING,
});

/**
 * reducers
 */

const INITIAL_STATE = fromJS({
  loading: false,
});

const ACTION_HANDLERS = {
  // 显示Loading进度条
  [constants.SHOW_LOADING]: state => state.set('loading', true),
  // 隐藏Loading进度条
  [constants.HIDE_LOADING]: state => state.set('loading', false),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
