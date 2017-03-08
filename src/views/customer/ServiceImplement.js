/**
 * @file customer/ServiceImplement.js
 * 服务实施
 * @author sunweibin(695170566.qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import NavBar from '../../components/common/NavBar';

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
    title: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '服务实施',
  }

  render() {
    const { title, goBack } = this.props;
    return (
      <div className="custBasic">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          {title}
        </NavBar>
      </div>
    );
  }
}
