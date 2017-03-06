/**
 * @file customer/CustContactOrg.js
 *  机构客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import _ from 'lodash';

import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import './CustContactOrg.less';

const mapStateToProps = state => ({
  data: state.customer.contactList,
});

const mapDispatchToProps = {
  push: routerRedux.push,
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustContactOrg extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '',
    push: () => {},
    goBack: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  @autobind
  getCustBase() {
    // 获取机构联系人数据列表
    const { data = {} } = this.props.data;
    const { custId = '--' } = this.props.params;
    if (_.isEmpty(data) || _.isEmpty(data[custId])) return {};
    return data[custId].custBaseInfo || {};
  }

  @autobind
  getContactList() {
    // 获取机构联系人数据列表
    const { data = {} } = this.props;
    const { custId = '--' } = this.props.params;
    if (_.isEmpty(data) || _.isEmpty(data[custId])) return [];
    const temp = data[custId].orgCustomerContactInfoList || [];
    return (temp && temp instanceof Array && temp.length > 0) ? temp : [];
  }

  @autobind
  getMainContact(arr) {
    // 获取主要联系人数据，主要联系人唯一
    if (!(arr.length > 0 && arr instanceof Array)) return {};
    let mainObj = {};
    arr.map((item) => {
      if (item.mainFlag === true) mainObj = item;
      return true;
    });
    return mainObj;
  }

  @autobind
  getOtherContact(arr) {
    // 获取非主要联系人列表
    if (!(arr.length > 0 && arr instanceof Array)) return [];
    const otherArr = [];
    arr.map((item, index) => {
      if (item.mainFlag === false) {
        otherArr.push({
          key: index + 1,
          ...item,
        });
      }
      return true;
    });
    return otherArr;
  }

  @autobind
  handleClick(obj) {
    // 跳转联系人详情页
    const { push } = this.props;
    push({ pathname: `/ContactOrgDetail/${obj.rowId}` });
  }

  render() {
    const { goBack } = this.props;
    const { custName = '--' } = this.getCustBase();
    const contactArr = this.getContactList();
    const isNull = (contactArr && contactArr.length > 0) ? 'have-data' : 'no-data';
    const mainData = this.getMainContact(contactArr);
    const otherData = this.getOtherContact(contactArr);

    const mainShow = () => {
      if (mainData === {}) {
        return (
          <div className="item">
            <p className="left nodata"><Icon className="left" type="shenfenzheng" />暂无信息</p>
          </div>
        );
      }
      return (
        <div className="item" data={mainData} onClick={() => this.handleClick(mainData)}>
          <p className="left"><i className="main-icon" />{mainData.name || '--'}</p>
          <p className="right">{(mainData.custRela) ? mainData.custRela : '--'}</p>
          <Icon className="more" type="more" />
        </div>
      );
    };
    const otherShow = () => {
      if (otherData === []) return null;
      return otherData.map(item => (
        <div className="item" data={item} key={item.key} onClick={() => { this.handleClick(item); }}>
          <p className="left">{item.name || '--'}</p>
          <p className="right">{item.custRela || '--'}</p>
          <Icon className="more" type="more" />
        </div>
      ));
    };

    return (
      <div className="cust-contact-org">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          <p className="mid-contain">{custName}</p>
        </NavBar>
        <section className="contain">
          <div className={`null-msg ${isNull}`}>
            <img className="null-icon" alt="空数据" src="../../../static/img/none.png" />
            <p>暂无联系人</p>
          </div>
          <div className={`main ${isNull}`}>
            {mainShow()}
          </div>
          <div className={`other ${isNull} len-${otherData.length}`}>
            {otherShow()}
          </div>
        </section>
      </div>
    );
  }
}
