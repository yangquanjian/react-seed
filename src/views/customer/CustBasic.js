/**
 * @file customer/CustBasic.js
 *  客户基本信息
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import _ from 'lodash';

import withNavBar from '../../components/common/withNavBar';
import PullToRefreshable from '../../components/common/PullToRefreshable';
import Icon from '../../components/common/Icon';
import './custbasic.less';

const Item = List.Item;
// 个人客户标签列表
const perLabelArr = [
  { type: 'custAge', name: '年龄', value: '', key: 0 },
  { type: 'custGrade', name: '客户等级', value: '', key: 0 },
  { type: 'idType', name: '证件类型', value: '', key: 0 },
  { type: 'idNum', name: '证件号码', value: '', key: 0 },
  { type: 'idValDate', name: '证件有效期', value: '', key: 0 },
  { type: 'job', name: '职业', value: '', key: 0 },
  { type: 'degree', name: '学历', value: '', key: 0 },
  { type: 'merriage', name: '婚姻状况', value: '', key: 0 },
  { type: 'hobits', name: '爱好', value: '', key: 0 },
  { type: 'acctStatus', name: '账户状态', value: '', key: 0 },
  { type: 'openTime', name: '开户时间', value: '', key: 0 },
  { type: 'priSalesTeam', name: '服务经理', value: '', key: 0 },
  { type: 'lastCommission', name: '最近一次服务时间', value: '', key: 0 },
];
// 机构客户标签列表
const orgLabelArr = [
  { type: 'acctType', name: '机构类型', value: '', key: 0 },
  { type: 'custGrade', name: '客户等级', value: '', key: 0 },
  { type: 'idType', name: '证件类型', value: '', key: 0 },
  { type: 'idNum', name: '证件号码', value: '', key: 0 },
  { type: 'idValDate', name: '证件有效期', value: '', key: 0 },
  { type: 'industry', name: '所属行业', value: '', key: 0 },
  { type: 'regAsset', name: '注册资金（万元）', value: '', key: 0 },
  { type: 'regAddress', name: '注册地点', value: '', key: 0 },
  { type: 'foundTime', name: '成立时间', value: '', key: 0 },
  { type: 'busiArea', name: '经营范围', value: '', key: 0 },
  { type: 'acctStatus', name: '账户状态', value: '', key: 0 },
  { type: 'openTime', name: '开户时间', value: '', key: 0 },
  { type: 'priSalesTeam', name: '服务经理', value: '', key: 0 },
  { type: 'lastCommission', name: '最近一次服务时间', value: '', key: 0 },
];

const getDataFunction = query => ({
  type: 'customer/getCustBasic',
  payload: query || {},
});

const mapStateToProps = state => ({
  data: state.customer.basic,
  isLoading: state.loading.models.customer,
});
const mapDispatchToProps = {
  // 下拉刷新组件
  refresh: getDataFunction,
  goBack: routerRedux.goBack,
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
@withNavBar({ title: '基本信息', hasBack: true })
@PullToRefreshable
export default class CustBasic extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    refreshData: PropTypes.object.isRequired,
  }

  static defaultProps = {
    data: {},
    push: () => { },
  }

  componentWillMount() {
    const { refresh, refreshData } = this.props;
    refresh(refreshData);
  }

  componentDidUpdate() {
    // 过长内容，展开显示
    const { custSor } = this.props.params;
    const type = custSor || 'per';
    const labelArr = (type === 'per') ? ['job'] : ['industry', 'regAddress', 'busiArea'];
    labelArr.map((item) => {
      const node = this[item];
      const nodeW = (node) ? node.offsetHeight : 0;
      const parentHalfW = (node) ? (parseFloat(node.parentElement.clientWidth) / 2) : 0;
      if (nodeW !== 0 && nodeW > parentHalfW) {
        node.className += ' more';
      }
      return true;
    });
  }

  @autobind
  getMapKey(key) {
    // 获取数据模型key上value
    const dataModel = this.getDataModel();
    const value = (!dataModel || !dataModel[key] || dataModel[key] === '--') ? '--' : dataModel[key];
    return value;
  }

  @autobind
  getCustIcon() {
    // 获取顶部Icon
    const { custSor } = this.props.params;
    const dataModel = this.getDataModel();
    if (_.isEmpty(dataModel)) return null;
    const type = custSor || 'per';
    let icon = 'jigou';
    if (type === 'per') {
      icon = (!dataModel || dataModel.custGender === '男') ? 'touxiang' : 'nvxing';
    }
    return icon;
  }

  @autobind
  getDataModel() {
    // 获取数据
    const { data, location: { query: { custSor, custId } } } = this.props;
    const type = custSor || 'per';
    const temp = data[custId] || {};
    if (temp === {}) return {};
    const dataModel = (type === 'per') ? temp.customerInfoPer : temp.customerInfoOrg;
    return dataModel || {};
  }

  @autobind
  contactData(arr, obj = {}) {
    // 合并标签数组及接口数据
    const tempArr = arr;
    arr.map((item, index) => {
      let value = (!obj || !obj[item.type]) ? '--' : obj[item.type];
      if (item.type === 'idValDate' || item.type === 'foundTime' || item.type === 'openTime' || item.type === 'lastCommission') {
        value = (value.length === 10) ? value.replace(/-/g, '/') : value.slice(0, 10);
      }
      if (item.type === 'regAsset') value = (!value || isNaN(Number(value))) ? '0.00' : Number(value).toFixed(2);
      tempArr[index].value = value;
      tempArr[index].key = index + 1;
      return true;
    });
    return tempArr;
  }

  render() {
    const { location: { query: { custSor, custNumber } } } = this.props;
    const dataModel = this.getDataModel();
    const labelArr = (custSor === 'per') ? perLabelArr : orgLabelArr;
    const custIcon = this.getCustIcon();
    const custName = this.getMapKey('custName');
    const custNum = (!custNumber || custNumber === 'null') ? '--' : custNumber;
    const arr = this.contactData(labelArr, dataModel);
    const renderHead = obj => (
      <section className="baseHead">
        <div className="headIcon"><Icon type={obj.icon || 'jigou'} /></div>
        <div className="headInfo">
          <p className="custName">{ obj.name }</p>
          <p className="custNum">{ obj.number }</p>
        </div>
      </section>
    );
    const itemShow = arr.map(item => (
      <Item
        className={item.type}
        key={item.key}
        extra={<div className="text" ref={div => (this[item.type] = div)}>{item.value}</div>}
      >
        {item.name}
      </Item>
    ));
    return (
      <div className="custBasic">

        { renderHead({ icon: custIcon, name: custName, number: custNum }) }
        <List className="cust-basic-list">
          {itemShow}
        </List>

      </div>
    );
  }
}
