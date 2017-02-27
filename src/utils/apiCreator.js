/**
* @file utils/apiCreator
* @author maoquan(maoquan@htsc.com)
*/

import request from './request';

import { queryToString } from './helper';

/**
 * api生成器
 *
 * @param {Object} options api配置
 *
 * @return {Fucntion}
 */
export default function createApi(options = {}) {
  const { prefix = '/mcrm/api' } = options;

  // 如果没有前缀，自动补上
  const padPrefix = (url) => {
    if (!url.startsWith(prefix)) {
      return prefix + url;
    }
    return url;
  };

  // 授权信息: empId, deviceId, token
  let authInfo = {};

  return {

    setAuthInfo(info) {
      authInfo = info;
    },

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     *
     * @return {Promise}
     */
    get(url, query) {
      const finalUrl = padPrefix(url);
      const queryString = queryToString(query);
      return request(
        `${finalUrl}?${queryString}`,
        {
          method: 'GET',
          headers: {
            ...authInfo,
          },
        },
      );
    },

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     *
     * @return {Promise}
     */
    post(url, query) {
      const finalUrl = padPrefix(url);
      return request(
        finalUrl,
        {
          method: 'POST',
          headers: {
            ...authInfo,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query),
        },
      );
    },
  };
}
