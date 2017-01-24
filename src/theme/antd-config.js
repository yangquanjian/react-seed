var prefixMap = require('./antd-prefix');

/**
 * px是750px设计稿上取到的元素尺寸
 */
const px2rem = px => (`${px / 75}rem`)

module.exports = Object.assign(
  {},
  prefixMap,
  {
    '@tab-bar-height': px2rem(100),
  }
);
console.log(module.exports)
