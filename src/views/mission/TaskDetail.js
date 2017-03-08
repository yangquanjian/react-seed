/**
 * @file mission/TaskDetail.js
 * @author liutingting
 */

import React, { PropTypes, PureComponent } from 'react';
// import { autobind } from 'core-decorators';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import withNavBar from '../../components/common/withNavBar';
import MotDetailDesc from '../../components/mission/MotDesc';
import MotCustList from '../../components/mission/MotCustList';

const getDataFunction = query => ({
  type: 'mission/fetchMotDetail',
  payload: query || {},
});

const mapStateToProps = state => ({
  // 获取任务详情
  getData: getDataFunction,
  // 下拉刷新
  refresh: getDataFunction,
  push: routerRedux.push,
  data: state.mission.motDetail,
});

const mapDispatchToProps = {
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '任务详情', hasBack: true })
export default class TaskDetail extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    list: PropTypes.array,
    location: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    push: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    list: [],
    location: {},
    getData: () => {},
    push: () => { },
  };

  componentWillMount() {}

  render() {
    const { data,
      getData,
      push,
      location: { query: { motTaskId } },
    } = this.props;
    const motData = data[motTaskId] || {};
    const {
      summary = '--',
      taskCustList = [],
    } = motData;
    return (
      <section className="task-detail">
        <MotDetailDesc
          data={summary}
        />
        <MotCustList
          list={taskCustList}
          getList={getData}
          motTaskId={motTaskId}
          push={push}
        />
      </section>
    );
  }
}
