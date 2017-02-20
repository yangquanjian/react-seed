/**
 * @file mission/Detail.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import NavBar from '../../components/common/NavBar';

const mapStateToProps = state => ({
  test: state.test,
});

const mapDispatchToProps = {
  pop: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MissonDetail extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    pop: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '任务详情',
  };

  @autobind
  handleClick() {
    this.props.pop();
  }

  render() {
    const { title } = this.props;
    return (
      <div className="mission-detail">
        <NavBar iconName={false} leftContent={false}>{title}</NavBar>
        <a onClick={this.handleClick}>返回</a>
      </div>
    );
  }
}
