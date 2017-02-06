/**
 * NavBar.js
 *  导航组件, 包装antd-mobile的NavBar，并提供默认属性和样式
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes } from 'react';
import { NavBar as AMNavBar } from 'antd-mobile';

export default function NavBar(props) {
  return (
    <AMNavBar {...props} />
  );
}

NavBar.propTypes = {
  leftContent: PropTypes.any,
  mode: PropTypes.string,
  onLeftClick: PropTypes.func,
  rightContent: PropTypes.any,
  iconName: React.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

NavBar.defaultProps = {
  leftContent: '返回',
  iconName: 'left',
  mode: 'light',
  onLeftClick: () => undefined,
  rightContent: null,
};
