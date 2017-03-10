/**
 * @file sensorsLogger.js
 *  神策数据收集
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';

import api from '../api';
import { interval, whitelist, blacklist } from '../config/log';
import { getEnvVars } from '../utils/cordova';

const envVars = getEnvVars();

// 待发送日志队列
let QUEUE = [];

function isPass(action) {
  const { type } = action;
  if (!_.isEmpty(whitelist) && whitelist.indexOf(type) === -1) {
    return false;
  }
  if (blacklist.indexOf(type) !== -1) {
    return false;
  }
  return true;
}

function getEventType(action) {
  const { type } = action;
  const eventType = {
    type: 'track',
    event: type,
  };
  if (/getEmpInfoSuccess$/.test(type)) {
    return { type: 'profile_set' };
  }
  return eventType;
}

function getExtraData(action) {
  const { type } = action;
  let data = null;
  if (/getEmpInfoSuccess$/.test(type)) {
    data = action.payload.empInfo;
  }
  return data || {};
}

function getLogData(action) {
  // 登录信息
  const authInfo = api.getAuthInfo();
  const eventType = getEventType(action);
  const extraData = getExtraData(action);
  return {
    ...eventType,
    distinct_id: authInfo.empId || envVars.uuid, // eslint-disable-line
    time: new Date().getTime(),
    project: 'mcrm',
    properties: {
      ...envVars,
      ...extraData,
    },
  };
}

const flushLog = _.throttle(
  () => {
    // const data = [...QUEUE];
    QUEUE = [];
    // api.sendLog(url, data);
  },
  interval,
);

function sendLog(action) {
  if (!isPass(action)) {
    return;
  }
  const data = getLogData(action);
  QUEUE.push(data);
  flushLog();
}

export default function createSensorsLogger() {
  /* eslint-disable */
  return ({ getState }) => (next) => (action) => {
    sendLog(action);
    return next(action);
  };
  /* eslint-disable */
}
