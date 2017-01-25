/**
* @file app/index.js
* @author maoquan(maoquan@htsc.com)
*/

import React, { Component, PropTypes } from 'react';
import connect from '../../decorators/connect';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { autobind } from 'core-decorators';

import Icon from '../../components/Icon';
import tabConfig from '../../config/tabConfig';

const mapStateToProps = state => ({
  loading: state.getIn(['global', 'loading']),
});

@connect(mapStateToProps)
class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
    };
    return (
      <Icon
        className={isSelected ? '' : 'icon-selected'}
        type={iconMap[icon]}
      />
    );
  }

  @autobind
  renderTabBarItem(item) {
    return (
      <TabBar.Item
        key={item.key}
        title={item.label}
        icon={this.renderIcon(item.key, false)}
        selectedIcon={this.renderIcon(item.key, true)}
        selected={item.isSelected}
        onPress={() => {
          this.onChange(item);
        }}
      >
        {item.component}
      </TabBar.Item>
    );
  }

  render() {
    const { children, location, loading } = this.props;
    const { action, pathname } = location;
    // tabbar内渲染 or 独立页面
    let findTabItem = false;
    const tabs = tabConfig.map(
      (item) => {
        const { component } = item;
        if (component === children.type
          || component.type === children.type) {
          findTabItem = true;
          return this.renderTabBarItem({ ...item, component: children, isSelected: true });
        }
        return this.renderTabBarItem(item);
      },
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
        className="page-container"
        key={pathname}
      >{children}</div>
    );
    return (
      <div className="page-wrapper">
        <ReactCSSTransitionGroup
          component="section"
          transitionName={action === 'POP' ? 'page-reverse' : 'page'}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {main}
        </ReactCSSTransitionGroup>
        <ActivityIndicator toast animating={loading} text="正在加载" />
      </div>
    );
  }
}

export default withRouter(App);
