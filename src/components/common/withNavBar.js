/**
 * @file common/NavBarable.js
 *  导航条修饰组件
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import NavBar from './NavBar';

export default options => (ComposedComponent) => {
  const { title, hasBack } = options;
  class NavBarComponent extends PureComponent {
    static propTypes = {
      goBack: PropTypes.func,
    }

    static defaultProps = {
      goBack: () => {},
    }

    render() {
      const { goBack } = this.props;
      return (
        <div>
          <NavBar
            iconName={hasBack ? 'fanhui' : false}
            onLeftClick={goBack}
          >{title}</NavBar>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
  return NavBarComponent;
};
