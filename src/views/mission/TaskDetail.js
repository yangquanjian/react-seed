/**
 * @file mission/TaskDetail.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import withNavBar from '../../components/common/withNavBar';
import Icon from '../../components/common/Icon';
import './taskDetail.less';

const mapStateToProps = state => ({
  test: state.test,
});

const mapDispatchToProps = {
  pop: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '任务详情', hasBack: true })
export default class TaskDetail extends PureComponent {

  static propTypes = {
    pop: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  @autobind
  handleClick() {
    this.props.pop();
  }

  render() {
    return (
      <section className="task-detail">
        <div className="task-desc">
          <h2 className="til"><Icon type="task" />新股中签余额不足新股中签余额不足新股中签余额不足新股中签余额不足新股中签</h2>
          <div className="desc down">
            <p>樊芸代表发言说，互联网给百姓生活提供了很大便利，但网约车等业务也出现了一些新的问题。总书记当场要求有关部门予以落实</p>
          </div>
        </div>
        <div className="task-list">
          <div className="item per">
            <div className="top">
              <Icon className="photo" type="kehu01" />
              <div className="info">
                <p className="cust-name">张三</p>
                <Icon type="card" />
                <span className="sex">男</span> |
                <span className="age">52</span>岁
                <span className="btn">高净值客户</span>
              </div>
              <Icon className="more" type="more" />
            </div>
            <div className="bot">
              <p><Icon type="information" />樊芸代表发言说，互联网给百姓生活提供了很大便利</p>
            </div>
          </div>
          <div className="item org">
            <div className="top">
              <Icon className="photo" type="kehu01" />
              <div className="info">
                <p className="cust-name">有限公司</p>
                <Icon type="card" />
                <span className="btn">高净值客户</span>
              </div>
              <Icon className="more" type="more" />
            </div>
            <div className="bot">
              <p><Icon type="information" />樊芸代表发言说，互联网给百姓生活提供了很大便利，但网约车等业务也出现了一些新的问题。总书记当场要求有关部门予以落实</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
