/**
 * @file customer/CustBasic.js
 *  客户基本信息
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { NavBar } from 'antd-mobile';
import CustBasicHead from '../../components/customer/CustBasicHead';
import BasicList from '../../components/customer/BasicList';

const mapStateToProps = state => ({
  data: state.customer.basic,
});

const mapDispatchToProps = {
  push: () => {},
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustBasic extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: '基本信息',
  }

  constructor(props) {
    super(props);
    this.state = {
      getMapKey: (key) => {
        const value = this.props.data[key];
        return (!value) ? '--' : value;
      },
      getDataArr: () => Object.entries(this.props.data),
    };
  }

  render() {
    const { title } = this.props;
    const { getMapKey, getDataArr } = this.state;
    const custType = this.props.params.type;

    return (
      <div className="custBasic">
        <NavBar>
          <p>{title}</p>
        </NavBar>

        <CustBasicHead
          type={custType}
          sex={getMapKey('sex')}
          name={getMapKey('custName')}
          number={getMapKey('econNum')}
        />

        <BasicList
          type={custType}
          data={getDataArr()}
          getMapKey={getMapKey}
          {...this.state}
        />
      </div>
    );
  }
}
