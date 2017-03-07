/**
 * @file utils/cordova.js
 *  封装app提供的cordova相关方法
 * @author maoquan(maoquan@htsc.com)
 */

 // navigator.connection.type
 // navigator.onLine
 // navigator.appVersion
 // navigator.platform
 // device

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
};
