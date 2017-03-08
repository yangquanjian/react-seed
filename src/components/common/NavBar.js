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
    leftContent: '',
    iconName: false,
    mode: 'light',
    onLeftClick: () => undefined,
    rightContent: null,
  }

  renderLeft() {
    const { iconName, leftContent } = this.props;
    if (iconName) {
      return <Icon type={iconName} />;
    }
    return leftContent || null;
  }

  render() {
    const { ...others } = this.props;
    return (
      <AMNavBar
        className="navbar"
        {...others}
        iconName={false}
        leftContent={this.renderLeft()}
      />
    );
  }
}
