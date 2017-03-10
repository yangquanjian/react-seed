/**
 * @file mission/CenterList.js
 * @author fengwencong
 */
import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { RefreshControl, ListView } from 'antd-mobile';
import _ from 'lodash';

import { renderIcon, renderLoading } from '../common/PullToRefreshable';
import { prepareDataSource } from '../../utils/listView';
import CenterListItem from './CenterListItem';
import helper from '../../utils/helper';

import './centerList.less';

export default class CenterList extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    getCenter: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
    getCenter: () => {},
    location: {},
    replace: () => {},
    push: () => { },
  }

  constructor(props) {
    super(props);

    const isError = _.isEmpty(props.data);
    const { motTaskList = [] } = props.data ? props.data : {};
    this.state = {
      dataSource: prepareDataSource(motTaskList, false),
      isLoading: false,
      isError,
      refreshing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data, location: { query } } = nextProps;
    const { location: { query: oldQuery } } = this.props;
    const { motTaskList = [] } = data || {};
    if (!_.isEqual(data, this.props.data)) {
      this.setState({
        dataSource: prepareDataSource(motTaskList, false),
        isLoading: false,
        isError: _.isEmpty(data),
        refreshing: false,
      });
    } else {
      this.setState({
        isLoading: false,
        refreshing: false,
        isError: _.isEmpty(data),
      });
    }
    // 条件变化
    if (!_.isEqual(query, oldQuery)) {
      const { isLoading } = this.state;
      if (!isLoading) {
        this.setState(
          {
            isLoading: true,
            isError: false,
            refreshing: false,
          }, this.refreshList(nextProps));
      }
    }
  }

  @autobind
  onRefresh() {
    this.setState({
      refreshing: true,
      isLoading: true,
      isError: false,
    });
    setTimeout(() => {
      this.refreshList(this.props);
    }, 1000);
  }

  @autobind
  refreshList(nextProps) {
    const { location: { query } } = nextProps;
    this.props.getCenter({
      ...query,
    });
  }

  @autobind
  renderHeader() {
    const {
      endTodayCount = 0,
      totalCount = 0,
    } = this.props.data ? this.props.data : {};
    return (
      <div className="centerHead">
        <div className="missionHead">
          <div className="headPart">
            <p className="headNum">{endTodayCount}</p>
            <p className="headLabel">今日到期</p>
          </div>
          <div className="headPart">
            <p className="headNum">{totalCount}</p>
            <p className="headLabel">今日可做</p>
          </div>
        </div>
        <div className="listHead">
          <h3>
            <p>任务列表</p>
          </h3>
        </div>
      </div>
    );
  }

  @autobind
  renderRow(rowData, sectionID, rowID) {
    if (_.isEmpty(rowData)) {
      return null;
    }
    const { push } = this.props;
    return (
      <CenterListItem
        key={`${sectionID}-${rowID}`}
        {...rowData}
        push={push}
      />
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        className="list-separator"
      />
    );
  }

  @autobind
  renderFooter() {
    const { isLoading, isError } = this.state;
    let text = '';
    if (isError) {
      text = '数据获取失败';
    } else if (isLoading) {
      text = '加载中...';
    } else {
      text = '已经到底了';
    }
    return (
      <div>
        {text}
      </div>
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        className="mission-list"
        dataSource={dataSource}
        renderSectionHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        pageSize={10}
        scrollRenderAheadDistance={400}
        scrollEventThrottle={20}
        style={{ height: helper.getAvailableHeight() }}
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          distanceToRefresh={100}
          icon={renderIcon()}
          loading={renderLoading()}
        />}
      />
    );
  }
}
