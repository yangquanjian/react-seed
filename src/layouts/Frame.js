/**
 * @file layouts/Frame.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import { withRouter } from 'dva/router';
import { autobind } from 'core-decorators';

import TabPane from './TabPane';
import Icon from '../components/common/Icon';
import tabConfig from '../config/tabConfig';

import '../css/main.less';

const mapStateToProps = state => ({
  loading: state.loading.global,
});

@connect(mapStateToProps)
class Frame extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
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

  renderIcon(icon, isSelected = false) {
    const iconMap = {
      mission: 'renwu',
      product: 'chanpin',
      customer: 'customer',
      profile: 'wode',
    };
    return (
      <Icon
        className={isSelected ? '' : 'icon-active'}
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
        { item.component }
      </TabBar.Item>
    );
  }

  render() {
    const { children, location, loading = false } = this.props;
    const { pathname } = location;
    const paths = pathname.split('/').filter(path => !!path);
    // 暂时先根据pathname长度决定是否隐藏tabbar,
    // 后续根据需求建立需要tabbar的白名单,如{ '/product': true, ... }
    const isTabBarHidden = paths.length > 1;

    // tabbar内渲染 or 独立页面
    let findTabItem = false;
    const tabs = tabConfig.map(
      (item) => {
        if (pathname.slice(1).startsWith(item.key)) {
          findTabItem = true;
          return this.renderTabBarItem({ ...item, component: children, isSelected: true });
        }
        return this.renderTabBarItem({ ...item, component: TabPane });
      },
    );
    const main = findTabItem ? (
      <TabBar
        unselectedTintColor="#c5c4c7"
        tintColor="#ffffff"
        barTintColor="#2d3333"
        hidden={isTabBarHidden}
      >
        {tabs}
      </TabBar>
    ) : (
      <div className="page-wrapper">{children}</div>
    );
    return (
      <div className="page-wrapper">
        {main}
        <ActivityIndicator toast animating={loading} text="正在加载" />
      </div>
    );
  }
}

export default withRouter(Frame);
