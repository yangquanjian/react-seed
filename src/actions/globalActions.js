/**
 * @file actions/globalActions.js
 * @author maoquan(maoquan@htsc.com)
 */

import Types from '../constants/Global';

export default {};

export const setCurrentUser = user => ({
  type: Types.SET_CURRENT_USER,
  payload: user,
});
