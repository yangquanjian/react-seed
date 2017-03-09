/**
 * @file mission/TaskDetail.js
 * @author liutingting
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import _ from 'lodash';

import withNavBar from '../../components/common/withNavBar';
import PullToRefreshable from '../../components/common/PullToRefreshable';
import MotDetailDesc from '../../components/mission/MotDesc';
import MotCustItem from '../../components/mission/MotCustItem';

const getDataFunction = query => ({
  type: 'mission/fetchMotDetail',
  payload: query || {},
});

const mapStateToProps = state => ({
  data: state.mission.motDetail,
  // 下拉刷新
  refresh: getDataFunction,
  push: routerRedux.push,
  isLoading: state.loading.models.mission,
});

const mapDispatchToProps = {
  // 下拉刷新组件
  refresh: getDataFunction,
  push: routerRedux.push,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location: { query } } = ownProps;
  return {
    refreshData: query,
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
@withNavBar({ title: '任务详情', hasBack: true })
@PullToRefreshable
export default class TaskDetail extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    refreshData: PropTypes.object.isRequired,
    push: PropTypes.func,
    location: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: {},
    location: {},
    push: () => { },
  };

  componentWillMount() {
    const { refresh, refreshData } = this.props;
    refresh(refreshData);
  }

  @autobind
  getDataModel(key) {
    const { data,
      location: { query: { motTaskId } },
    } = this.props;
    const motData = data[motTaskId] || {};
    const {
      summary = '--',
      taskCustList = [],
    } = motData;
    if (key === 'summary') return summary;
    if (key === 'taskCustList') return taskCustList;
    return null;
  }

  @autobind
  renderRow() {
    const list = this.getDataModel('taskCustList');
    if (_.isEmpty(list) || list === []) {
      return null;
    }
    const { push,
      location: { query: { motTaskId } },
    } = this.props;
    return list.map((item, index) => (
      <MotCustItem
        key={`row-${index + 1}`}
        {...item}
        motTaskId={motTaskId}
        push={push}
      />
    ));
  }

  render() {
    const summary = this.getDataModel('summary');
    return (
      <section className="task-detail">
        <MotDetailDesc
          data={summary}
        />
        <div className="mot-cust-list">
          {this.renderRow()}
        </div>
      </section>
    );
  }
}
