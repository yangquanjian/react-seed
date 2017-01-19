/**
* @file App/index.js
* @author maoquan
*/

import React, { Component, PropTypes } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router';

import tabConfig from '../../config/tabConfig';
import icon from '../../components/tab-bar/images/zhifubao.png';
import iconSelected from '../../components/tab-bar/images/zhifubao_sel.png';

class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.Object.isRequired,
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

  render() {
    const { children } = this.props;
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
          icon={icon}
          selectedIcon={iconSelected}
          selected={activeKey === item.key}
          badge={1}
          onPress={() => {
            this.onChange(item);
          }}
        >
          {item.component}
        </TabBar.Item>
      ),
    );
    return findTabItem ? (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {tabs}
      </TabBar>
    ) : (
      <div>{children}</div>
    );
  }
}

export default withRouter(App);
