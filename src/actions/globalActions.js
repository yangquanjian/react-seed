/**
 * @file actions/globalActions.js
 * @author yankun01
 */

import Types from '../constants/Global';

export const setCurrentUser = user => ({
  type: Types.SET_CURRENT_USER,
  payload: user,
});
