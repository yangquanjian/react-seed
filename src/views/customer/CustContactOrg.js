/**
 * @file customer/CustContactOrg.js
 *  机构客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';

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
  getBaseKey(key) {
    const data = this.props.data;
    if (!data) return undefined;
    const value = data.custBaseInfo[key];
    return (!value) ? '--' : value;
  }

  @autobind
  getContactList() {
    const temp = this.props.data.orgCustomerContactInfoList;
    return (temp instanceof Array && temp.length > 0) ? temp : [];
  }

  @autobind
  getMainContact(arr) {
    if (!arr || arr.length < 1) return null;
    let mainObj = null;
    arr.map((item) => {
      if (item.mainFlag === true) mainObj = item;
      return true;
    });
    return mainObj;
  }

  @autobind
  getOtherContact(arr) {
    if (!arr || arr.length < 1) return [];
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
    const { push } = this.props;
    push({ pathname: `/ContactOrgDetail/${obj.rowId}` });
  }

  render() {
    const { goBack } = this.props;
    const title = this.getBaseKey('custName');
    const contactArr = this.getContactList();
    const isNull = (contactArr && contactArr.length > 0) ? 'have-data' : 'no-data';
    const mainData = this.getMainContact(contactArr);
    const otherData = this.getOtherContact(contactArr);

    const mainShow = () => {
      if (mainData === null) {
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
    const otherShow = otherData.map(item => (
      <div className="item" data={item} key={item.key} onClick={() => { this.handleClick(item); }}>
        <p className="left">{item.name}</p>
        <p className="right">{item.custRela}</p>
        <Icon className="more" type="more" />
      </div>
    ));

    return (
      <div className="cust-contact-org">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          <p className="mid-contain">{title}</p>
        </NavBar>
        <secttion className="contain">
          <div className={`null-msg ${isNull}`}>
            <img className="null-icon" alt="空数据" src="../../../static/img/none.png" />
            <p>暂无联系人</p>
          </div>
          <div className={`main ${isNull}`}>
            {mainShow()}
          </div>
          <div className={`other ${isNull}`}>
            {otherShow}
          </div>
        </secttion>
      </div>
    );
  }
}
