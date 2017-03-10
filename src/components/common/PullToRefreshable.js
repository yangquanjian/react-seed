/**
 * @file common/PullToRefreshable.js
 *  下拉刷新修饰组件
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';

import helper from '../../utils/helper';
import PullToRefresh from './PullToRefresh';

import Icon from '../common/Icon';

const PREFIX_CLS = 'am-refresh-control';
const DISTANCE_TO_REFRESH = helper.getRealSize(100);

export const renderIcon = () => (
  <div>
    <div className={`${PREFIX_CLS}-pull`}>
      <Icon type="xiajiantou" /> 下拉刷新
    </div>
    <div className={`${PREFIX_CLS}-release`}>
      <Icon type="shangjiantou" /> 释放更新
    </div>
  </div>
);

export const renderLoading = () => (
  <div>
    <Icon type="loading" />
    <span>加载中...</span>
  </div>
);


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

    render() {
      const { isLoading } = this.props;
      return (
        <PullToRefresh
          prefixCls={PREFIX_CLS}
          loadingFunction={this.loadingFunction}
          isLoading={isLoading}
          icon={renderIcon()}
          loading={renderLoading()}
          distanceToRefresh={DISTANCE_TO_REFRESH}
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
