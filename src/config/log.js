/**
 * @file config/log.js
 *  神策数据收集相关配置
 * @author maoquan(maoquan@htsc.com)
 */

const config = {
  url: 'https://abtest.zhangle.com/abtest/pass/mc/sensors',
  interval: 5000,
  blacklist: ['@@DVA_LOADING/HIDE', '@@DVA_LOADING/SHOW'],
  whitelist: [],
};

export default config;
