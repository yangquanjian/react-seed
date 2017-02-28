/**
 * @file customer/CustBasic.js
 *  客户基本信息
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import { List } from 'antd-mobile';
import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import './custbasic.less';

const Item = List.Item;

const per = [
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
const org = [
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

const mapStateToProps = state => ({
  data: state.customer.basic,
});
const mapDispatchToProps = {
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustBasic extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '基本信息',
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getMapKey(key) {
    const dataModel = Object.values(this.props.data)[1];
    const value = dataModel[key];
    return (!value || value === '--') ? '--' : value;
  }

  getCustIcon() {
    const dataModel = Object.values(this.props.data)[1];
    const type = (this.props.params.custSor === 'per') ? 'per' : 'org';
    let icon = '';
    if (type === 'per') {
      icon = (!dataModel || dataModel.custGender === '男') ? 'touxiang' : 'nvxing';
    } else {
      icon = 'jigou';
    }
    return icon;
  }

  getDataModel() {
    return Object.values(this.props.data)[1];
  }

  contactData(arr, obj) {
    const tempArr = arr;
    arr.map((item, index) => {
      let value = obj[item.type];
      if (!value || value === '--') {
        value = '--';
      } else if (item.type === 'idValDate' || item.type === 'foundTime' || item.type === 'openTime' || item.type === 'lastCommission') {
        value = (value.length === 10) ? value.replace(/-/g, '/') : value.slice(0, 10);
      }
      tempArr[index].value = value;
      tempArr[index].key = index + 1;
      return true;
    });
    return tempArr;
  }

  render() {
    const { title, params, goBack } = this.props;
    const labelArr = (this.props.params.custSor === 'per') ? per : org;
    const getCustIcon = this.getCustIcon();
    const custName = this.getMapKey('custName');
    const dataModel = this.getDataModel();
    const arr = this.contactData(labelArr, dataModel);
    const renderHead = obj => (
      <section className="baseHead">
        <div className="headIcon"><Icon type={obj.icon} /></div>
        <div className="headInfo">
          <p className="custName">{obj.name}</p>
          <p className="custNum">{obj.number}</p>
        </div>
      </section>
    );
    const itemShow = arr.map(item => (
      <Item
        className={`${item.type}`}
        key={`${item.key}`}
        extra={`${item.value}`}
      >
        {item.name}
      </Item>
    ));
    return (
      <div className="custBasic">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          {title}
        </NavBar>

        { renderHead({ icon: getCustIcon, name: custName, number: params.custNumber }) }

        <List className="cust-basic-list">
          {itemShow}
        </List>

      </div>
    );
  }
}
