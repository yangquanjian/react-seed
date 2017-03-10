/**
 * @file utils/helper.js
 *  常用工具方法
 * @author maoquan(maoquan@htsc.com)
 */

const helper = {

  /**
   * 将{ a: 1, b: 2 } => a=1&b=2
   * @param {object} query
   */
  queryToString(query = {}) {
    const encode = encodeURIComponent;
    return Object.keys(query).map(
      key => (`${encode(key)}=${encode(query[key])}`),
    ).join('&');
  },

  /**
   * 由?a=1&b=2 ==> {a:1, b:2}
   * @param {string} search 一般取自location.search
   */
  getQuery(search) {
    const query = {};
    // 去掉`?`
    const searchString = search.slice(1);
    if (searchString) {
      searchString.split('&').map(
        item => item.split('='),
      ).forEach(
        item => (query[item[0]] = item[1]),
      );
    }
    return query;
  },

  isLocalStorageSupport() {
    const KEY = 'STORAGE_TEST_KEY';
    try {
      localStorage.setItem(KEY, KEY);
      localStorage.removeItem(KEY);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * 根据css中设定的尺寸，得到真实展现时缩放后的尺寸
   */
  getRealSize(origin) {
    const rootSize = parseInt(document.documentElement.style.fontSize, 10) || 75;
    return (origin / 75) * rootSize;
  },

  hasClass(elem, className) {
    return elem.className.indexOf(className) > -1;
  },

  /**
   * 计算页面内可用高度
   * @param {object} option 选项
   * @param {boolean} option.includeBar 是否包括导航栏高度
   */
  getAvailableHeight(options = {}) {
    const { includeNavBar = false } = options;
    const navBarElem = document.querySelector('.navbar');
    let navBarHeight = navBarElem ? navBarElem.offsetHeight : 0;
    if (includeNavBar) {
      // 设成0就不用减掉了
      navBarHeight = 0;
    }
    const tabBarElem = document.querySelector('.am-tab-bar-bar');
    let tabBarHeight = 0;
    if (tabBarElem) {
      tabBarHeight = helper.hasClass(tabBarElem, 'am-tab-bar-bar-hidden')
        ? 0 : tabBarElem.offsetHeight;
    }
    return document.documentElement.clientHeight - navBarHeight - tabBarHeight;
  },
};

export default helper;
