/**
 * @file customer/CustBasic.js
 *  客户基本信息
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { NavBar } from 'antd-mobile';
import CustBasicHead from '../../components/customer/CustBasicHead';
import BasicList from '../../components/customer/BasicList';

const mapStateToProps = state => ({
  data: state.customer.get('basicData'),
});

const mapDispatchToProps = {
  getList: categoryId => ({
    type: 'customer/getBasic',
    payload: { categoryId },
  }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustBasic extends PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: '基本信息',
  }

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      getMapKey: (key) => {
        const value = this.props.data.get(key);
        return (!value) ? '--' : value;
      },
    };
  }

  render() {
    const { data, title } = this.props;
    const getMapKey = this.state.getMapKey;
    const custType = (this.props.params.id === 1) ? 'org' : 'per';

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
          data={data}
        />
      </div>
    );
  }
}
