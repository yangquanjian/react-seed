var prefixMap = require('./antd-prefix');

var baseREM = 75;

/**
 * px是750px设计稿上取到的元素尺寸
 */
const px2rem = px => (`${px / baseREM}rem`)

module.exports = Object.assign(
  {},
  prefixMap,
  {
    '@tab-bar-height': px2rem(120),

    '@font-size-icontext': px2rem(30),
    '@font-size-caption-sm': px2rem(36),
    '@font-size-base': px2rem(39),
    '@font-size-subhead': px2rem(42),
    '@font-size-caption': px2rem(45),
    '@font-size-heading': px2rem(51),
    '@font-size-display-sm': px2rem(54),
    '@font-size-display-md': px2rem(63),
    '@font-size-display-lg': px2rem(72),
    '@font-size-display-xl': px2rem(90),
  }
);
