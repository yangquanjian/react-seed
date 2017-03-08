/**
 * @file common/PullToRefreshable.js
 *  下拉刷新修饰组件
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import PullToRefresh from './PullToRefresh';

import Icon from '../common/Icon';

export default (ComposedComponent) => {
  class RefreshableComponent extends PureComponent {

    static propTypes = {
      // 刷新方法
      refresh: PropTypes.func,
      // 控制loading状态显示
      isLoading: PropTypes.bool,
      location: PropTypes.object,
      refreshData: PropTypes.object,
    }

    static defaultProps = {
      isLoading: false,
      location: {},
      refresh: () => {},
      refreshData: undefined,
    }

    @autobind
    loadingFunction() {
      const { location: { query }, refresh, refreshData } = this.props;
      refresh(refreshData || query);
    }

    renderIcon() {
      return (
        <div>
          <div className="pull">
            <Icon type="xiajiantou" />
            <span>下拉刷新</span>
          </div>
          <div className="release">
            <Icon type="shangjiantou" />
            <span>释放更新</span>
          </div>
        </div>
      );
    }

    renderLoading() {
      return (
        <div>
          <Icon type="loading" />
          <span>加载中...</span>
        </div>
      );
    }

    render() {
      const { isLoading } = this.props;
      return (
        <PullToRefresh
          loadingFunction={this.loadingFunction}
          isLoading={isLoading}
          icon={this.renderIcon()}
          loading={this.renderLoading()}
          distanceToRefresh={50}
          className="freshable-container"
          contentClassName="freshable"
        >
          <ComposedComponent {...this.props} />
        </PullToRefresh>
      );
    }
  }

  return RefreshableComponent;
};
