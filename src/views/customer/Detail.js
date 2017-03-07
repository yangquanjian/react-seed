/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import withNavBar from '../../components/common/withNavBar';
import PullToRefreshable from '../../components/common/PullToRefreshable';
import CustomerDetailHeader from '../../components/customer/DetailHeader';
// import RecommendProductList from '../../components/customer/RecommendProductList';
import CustomerDetailFooter from '../../components/customer/DetailFooter';
import TabBar from '../../components/customer/Tab';

const getDataFunction = query => ({
  type: 'customer/fetchCustDetail',
  payload: query || {},
});

const mapStateToProps = state => ({
  data: state.customer.detailInfo,
  isLoading: state.loading.models.customer,
  // recommendList: state.customer.recommendList,
});

const mapDispatchToProps = {
  ignoreProduct: custId => ({
    type: 'customer/ignoreProduct',
    payload: { custId },
  }),
  // 提供给下拉刷新组件
  refresh: getDataFunction,
  push: routerRedux.push,
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '客户详情', hasBack: true })
@PullToRefreshable
export default class CustomerDetail extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    // recommendList: PropTypes.array.isRequired,
    push: PropTypes.func,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    data: {},
    push: () => { },
  };

  componentWillMount() {
    const { location: { query }, refresh } = this.props;
    const { custId, custNumber, custSor } = query;
    refresh({ custId, custNumber, custSor });
  }

  render() {
    const { data, push, location: { query: { custId } } } = this.props;
    const custData = data[custId] || {};
    const {
      custBaseInfo = {},
      monthlyProfits = [],
      custMoneyDistributionDTOList = [],
      custSor,
      custNumber,
    } = custData;

    const { lastCommission = '' } = custBaseInfo.lastCommission || {};

    // <RecommendProductList {...this.props} />
    return (
      <div>
        <CustomerDetailHeader
          data={custBaseInfo}
          custSor={custSor}
          custNumber={custNumber}
          custId={custId}
          push={push}
        />
        <TabBar
          chartData={monthlyProfits}
          assetData={custMoneyDistributionDTOList}
        />
        <CustomerDetailFooter
          lastCommission={lastCommission}
          push={push}
          custSor={custSor}
          custNumber={custNumber}
          custId={custId}
        />
      </div>
    );
  }
}
