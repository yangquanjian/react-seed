/**
 * @file profile/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import NavBar from '../../components/common/NavBar';

const mapStateToProps = state => ({
  token: state.global.token,
});

const mapDispatchToProps = {
  getToken: query => ({
    type: 'global/getToken',
    payload: query,
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    empId: PropTypes.string,
    deviceId: PropTypes.string,
    token: PropTypes.string.isRequired,
    getToken: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '个人设置',
    empId: '002332',
    deviceId: String(Math.random()),
  }

  @autobind
  handleClick() {
    const { empId, deviceId } = this.props;
    this.props.getToken({ empId, deviceId });
  }

  render() {
    const { title, token, empId, deviceId } = this.props;
    return (
      <div className="page-profile">
        <NavBar>{title}</NavBar>
        <p>
          <a onClick={this.handleClick}>先点击这里刷新token，再点击下面链接</a>
        </p>
        {token ? (
          <p>
            <a href={`/?empId=${empId}&deviceId=${deviceId}&token=${token}`}>点击跳转到带token页面</a>
          </p>
        ) : null}
      </div>
    );
  }
}

