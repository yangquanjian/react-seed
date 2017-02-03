/**
 * @file utils/createConstants.js
 * @author maoquan(maoquan@htsc.com)
 */

import { createTypes } from 'reduxsauce';

export default {};

/**
 * 生成异步action需要的四个常量:
 *  {
 *    LOAD: XXX_LOAD,
 *    REQUEST: XXX_REQUEST,
 *    SUCCESS: XXX_SUCCESS,
 *    FAILURE: XXX_FAILURE
 *  }
 *  其中，
 *    LOAD有saga监听到并发起ajax请求，
 *    REQUEST在ajax请求发起后派发，
 *    SUCCES在ajax成功响应后派发，
 *    FAILURE在ajax失败后派发，
 */
export function createRequestConstants(prefix) {
  return createTypes(`
    LOAD
    REQUEST
    SUCCESS
    FAILURE
  `, { prefix });
}
