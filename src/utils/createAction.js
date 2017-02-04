/**
 * @file createAction
 * @author maoquan(maoquan@htsc.com)
 */

export default function createAction(type, payload = {}) {
  return { type, ...payload };
}

/**
 * 生成ajax请求用的全套action
 *  > XXX_REQUEST: ajax请求发起后派发
 *  > XXX_SUCCESS: ajax请求成功后派发
 *  > XXX_FAILURE: ajax请求失败后派发
 */
export function createRequestActions(constants) {
  return {
    request: args => createAction(constants.REQUEST, args),
    success: args => createAction(constants.SUCCESS, args),
    failure: args => createAction(constants.FAILURE, args),
  };
}
