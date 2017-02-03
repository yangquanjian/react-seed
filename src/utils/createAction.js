/**
 * @file createAction
 * @author maoquan(maoquan@htsc.com)
 */

export default function createAction(type, payload = {}) {
  return { type, ...payload };
}

/**
 * 生成ajax请求用的全套action
 *  > XXX_LOAD: 由saga捕获并发起ajax请求
 *  > XXX_REQUEST: ajax请求发起后派发
 *  > XXX_SUCCESS: ajax请求成功后派发
 *  > XXX_FAILURE: ajax请求失败后派发
 */
export function createRequestActions(constants) {
  return {
    load: () => createAction(constants.LOAD),
    request: () => createAction(constants.REQUEST),
    success: response => createAction(constants.SUCCESS, { response }),
    failure: error => createAction(constants.FAILURE, { error }),
  };
}
