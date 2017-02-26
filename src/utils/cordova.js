/**
 * @file utils/cordova.js
 *  封装app提供的cordova相关方法
 * @author maoquan(maoquan@htsc.com)
 */

 /** global MCRMCordovaPlugin */
 /** eslint no-undef: "error" */

function exec(method, args) {
  try {
    MCRMCordovaPlugin[method].apply(null, args);
  } catch (e) {
    // console.log(e);
  }
}

export default {
  nav2Login() {
    exec('nav2Login');
  },
};
