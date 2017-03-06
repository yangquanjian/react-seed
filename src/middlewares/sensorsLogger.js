/**
 * @file sensorsLogger.js
 *  神策数据收集
 * @author maoquan(maoquan@htsc.com)
 */

export default function createSensorsLogger() {
  const sa = {};

  if (typeof sa === 'undefined') {
    return () => next => action => next(action);
  }

  /* eslint-disable */
  return ({ getState }) => (next) => (action) => {
    return next(action);
  };
  /* eslint-disable */
}
