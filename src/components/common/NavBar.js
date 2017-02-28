/**
 * NavBar.js
 *  导航组件, 包装antd-mobile的NavBar，并提供默认属性和样式
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes, PureComponent } from 'react';
import { NavBar as AMNavBar } from 'antd-mobile';

import Icon from './Icon';
import './navbar.less';

export default class NavBar extends PureComponent {

  static propTypes = {
    leftContent: PropTypes.any,
    mode: PropTypes.string,
    onLeftClick: PropTypes.func,
    rightContent: PropTypes.any,
    iconName: React.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    leftContent: '返回',
    iconName: 'left',
    mode: 'light',
    onLeftClick: () => undefined,
    rightContent: null,
  }

  renderIcon(iconName) {
    if (!iconName) {
      return null;
    }
    return <Icon type={iconName} />;
  }

  render() {
    const { iconName, ...others } = this.props;
    return (
      <AMNavBar
        className="navbar"
        {...others}
        iconName={false}
        leftContent={this.renderIcon(iconName)}
      />
    );
  }
}
