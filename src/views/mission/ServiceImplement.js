/**
 * @file customer/ServiceImplement.js
 * 服务实施
 * @author sunweibin(695170566.qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
// import { Grid } from 'antd-mobile';
import NavBar from '../../components/common/NavBar';
// import Icon from '../../components/common/Icon';

import './ServiceImplement.less';

const mapStateToProps = state => ({
  data: state.customer.basic,
});
const mapDispatchToProps = {
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ServiceImplement extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
    title: '服务实施',
  }

  // 点击头部保存按钮的处理程序
  @autobind
  handleRightSaveButton() {
    console.log('点击了保存按钮');
    this.props.goBack();
  }

  render() {
    const { title, goBack } = this.props;
    // 渲染头部的右侧保存按钮
    const renderRightButton = obj => (
      <div className="right-button" onClick={this.handleRightSaveButton}>
        {obj.buttonName}
      </div>
    );


    return (
      <div className="custBasic">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
          rightContent={renderRightButton({ buttonName: '保存' })}
        >
          {title}
        </NavBar>
      </div>
    );
  }
}
