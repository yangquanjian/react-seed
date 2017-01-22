/**
* @file utils/apiCreator
* @author maoquan(maoquan@htsc.com)
*/

import request from './request';

/**
 * api生成器
 *
 * @param {Object} options api配置
 *
 * @return {Fucntion}
 */
export default function createApi(options = {}) {
  const { prefix = '/api' } = options;

  // 如果没有前缀，自动补上
  const padPrefix = (url) => {
    if (!url.startsWith(prefix)) {
      return prefix + url;
    }
    return url;
  };

  // 将{ a: 1, b: 2 } => a=1&b=2
  const queryToString = (query = {}) => {
    const encode = encodeURIComponent;
    return Object.keys(query).map(
      key => (`${encode(key)}=${encode(query[key])}`),
    ).join('&');
  };

  return {
    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     *
     * @return {Promise}
     */
    get(url, query) {
      const finalUrl = padPrefix(url);
      const queryString = queryToString(query);
      return request(`${finalUrl}?${queryString}`);
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query),
        },
      );
    },
  };
}
