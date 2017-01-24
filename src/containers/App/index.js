/**
* @file App/index.js
* @author maoquan
*/

import React, { Component, PropTypes } from 'react';
import { TabBar } from 'antd-mobile';
import Icon from 'components/Icon';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import tabConfig from '../../config/tabConfig';

class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  onChange(item) {
    const { router } = this.props;
    const { key } = item;
    router.push(`/${key}`);
  }

  renderIcon(icon, isSelected) {
    const iconMap = {
      mission: 'mission',
      product: 'chanpin',
      customer: 'kehu',
      mine: 'wode',
    }
    return <Icon
      className={ isSelected ? 'am-icon' : 'am-icon-selected' }
      type={ iconMap[icon] }
    />
  }

  render() {
    const { children, location } = this.props;
    const { action, pathname } = location;
    let findTabItem = false;
    let activeKey;
    if (children) {
      tabConfig.forEach(
        (item) => {
          const { component } = item;
          if (component === children.type
            || component.type === children.type) {
            // better immutable
            findTabItem = true;
            item.component = children;
            activeKey = item.key;
          }
        },
      );
    }
    const tabs = tabConfig.map(
      item => (
        <TabBar.Item
          key={item.key}
          title={item.label}
          icon={ this.renderIcon(item.key, false) }
          selectedIcon={ this.renderIcon(item.key, true) }
          selected={activeKey === item.key}
          onPress={() => {
            this.onChange(item);
          }}
        >
          {item.component}
        </TabBar.Item>
      ),
    );
    const main = findTabItem ? (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
          {tabs}
      </TabBar>
    ) : (
      <div
        className="xx"
        key={ pathname }
      >{children}</div>
    );
    return <ReactCSSTransitionGroup
      component="section"
      transitionName={ action === 'POP' ? 'page-reverse' : 'page' }
      transitionEnterTimeout={ 500 }
      transitionLeaveTimeout={ 500 }
    >
      { main }
    </ReactCSSTransitionGroup>
  }
}

export default withRouter(App);
