/**
 * @file utils/cordova.js
 *  封装app提供的cordova相关方法
 * @author maoquan(maoquan@htsc.com)
 */

const AppVersion = window.AppVersion || {};
const device = window.device || {};
const connection = navigator.connection || { type: 'unknown' };

function exec(method, args) {
  try {
    MCRMCordovaPlugin[method].apply(null, args);
  } catch (e) {
    console.log(e);
  }
}

export default {
  navToLogin() {
    exec('navToLogin');
  },
  getEnvVars() {
    // $app_version 字符串 应用的版本
    // $manufacturer 字符串 设备制造商，例如Apple
    // $model  字符串 设备型号，例如iphone6
    // $os 字符串 操作系统，例如iOS
    // $os_version 字符串 操作系统版本，例如8.1.1
    // $screen_height  数值  屏幕高度，例如1920
    // $screen_width 数值  屏幕宽度，例如1080
    // $wifi BOOL  是否使用wifi，例如true
    // $browser  字符串 浏览器名，例如Chrome
    // $browser_version  字符串 浏览器版本，例如Chrome 45
    // $carrier  字符串 运营商名称，例如ChinaNet
    // $network_type 字符串 网络类型，例如4G

    let browser = 'unknown';
    const androidMatch = /Android\s+([0-9.]+)/.exec(navigator.userAgent);
    if (androidMatch) {
      browser = androidMatch[0];
    } else {
      const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
      if (isIOS) {
        browser = 'ios';
      }
    }
    return {
      appVersion: AppVersion.version,
      manufacturer: device.manufacturer,
      model: navigator.platform,
      os: device.platform,
      osVersion: device.version,
      screenWidth: screen.width,
      screenHeight: screen.height,
      networkType: connection.type,
      browser,
      uuid: device.uuid,
      carrier: 'unknown',
    };
  },
  sendEmail(args) {
    exec('sendEmail', args);
  },
  processMotTask(args) {
    exec('processMotTask', args);
  },
};
