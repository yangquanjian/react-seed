/**
 * @file utils/createConstants.js
 * @author maoquan(maoquan@htsc.com)
 */

import { createTypes } from 'reduxsauce';

export default {};

/**
 * 生成异步action需要的三个常量:
 *  {
 *    REQUEST: XXX_REQUEST,
 *    SUCCESS: XXX_SUCCESS,
 *    FAILURE: XXX_FAILURE
 *  }
 *  其中，
 *    REQUEST在ajax请求发起后派发，
 *    SUCCES在ajax成功响应后派发，
 *    FAILURE在ajax失败后派发，
 */
export function createRequestConstants(prefix) {
  return createTypes(`
    REQUEST
    SUCCESS
    FAILURE
  `, { prefix: `${prefix}_` });
}
