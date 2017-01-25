/**
 * @file actions/globalActions.js
 * @author maoquan(maoquan@htsc.com)
 */

import Types from '../constants/Global';

export default {};

export const showLoading = () => ({
  type: Types.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: Types.HIDE_LOADING,
});
