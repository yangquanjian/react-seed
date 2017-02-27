/**
 * @file postcss.config.js
 * @author maoquan(maoquan@htsc.com)
 */

module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-pxtorem')({
      rootValue: 75,
      propWhiteList: [],
    })
  ]
}
