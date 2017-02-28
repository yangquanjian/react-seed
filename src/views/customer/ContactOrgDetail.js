/**
 * @file customer/ContactOrgDetail.js
 *  机构客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';

import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import './ContactOrgDetail.less';

const mapStateToProps = state => ({
  data: state.customer.contactList,
});

const mapDispatchToProps = {
  goBack: routerRedux.goBack,
};

const DATA = {
  custId: null,
  custSor: null,
  custNumber: null,
  custType: null,
  name: 'test-number-1', // 姓名
  custRelaCd: '206050', // 机构关系类型代码
  custRela: '机构客户联系人', // 机构关系类型
  rowId: 'CONTA-20170107-01418207865',
  mainFlag: false,
  validFlag: true,
  gender: null,
  cellPhones: [
    // {
    //   mainFlag: true,
    //   contactType: '104123',
    //   contactValue: '13544444666',
    //   rowId: 'COMMI-20170119-04837984213',
    //   validFlag: true
    // },
    // {
    //   mainFlag: false,
    //   contactType: '104123',
    //   contactValue: '15897221234',
    //   rowId: 'COMMI-20170119-04837984189',
    //   validFlag: true
    // }
  ],
  workTels: [
    {
      mainFlag: false,
      contactType: '104120',
      contactValue: '0514844930405148449304051484493040514844930405148449304051484493040514844930405148449304',
      rowId: 'COMMI-20170119-04837984216',
      validFlag: true,
    },
    {
      mainFlag: false,
      contactType: '104120',
      contactValue: '15251765885',
      rowId: 'COMMI-20170123-04837984271',
      validFlag: true,
    },
  ],
  homeTels: [
    {
      mainFlag: false,
      contactType: '104121',
      contactValue: '02586638091',
      rowId: 'COMMI-20170119-04837984214',
      validFlag: true,
    },
  ],
  otherTels: [
    {
      mainFlag: false,
      contactType: '104121',
      contactValue: '02586638091',
      rowId: 'COMMI-20170119-04837984214',
      validFlag: true,
    },
  ],
  emailAddresses: [
    {
      mainFlag: false,
      contactType: '104124',
      contactValue: 'rbhxhvccccchfbfbbrjjxbnehdjdjdjjxccchsh@139.comlljll',
      rowId: 'COMMI-20170217-04837984314',
      validFlag: true,
    },
    {
      mainFlag: false,
      contactType: '104124',
      contactValue: 'vvvvvvvvvvvvvvvvhuhjuvhhh@139.com',
      rowId: 'COMMI-20170217-04837984313',
      validFlag: true,
    },
  ],
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactOrgDetail extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '联系人详情',
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  @autobind
  renderRow(arr, label, icon) {
    if (!arr || !(arr instanceof Array)) return;
    // if (arr.length < 1) {
    //   return (<div className="item">
    //     <Icon className="" type={icon} />
    //     <div className="data">
    //       <p className="label">{label}</p>
    //       <p className="contain">暂无信息</p>
    //     </div>
    //   </div>);
    // }
    arr.map(item => (
      <div className={`item ${icon}`}>
        <Icon className="" type={icon} />
        <div className="data">
          <p className="label">{label}</p>
          <p className="contain">{item.contactValue}</p>
        </div>
        <div className="btn" onClick={() => { console.log(item.contactValue); }}>发送邮件</div>
      </div>
    ));
  }

  render() {
    const { title, goBack } = this.props;
    const renderRow = this.renderRow;
    const arr1 = DATA.cellPhones;
    const arr2 = DATA.workTels;
    const arr3 = DATA.homeTels;
    const arr4 = DATA.emailAddresses;

    return (
      <div className="contact-org-detail">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          {title}
        </NavBar>

        <secttion className="contain">
          <div className="item">
            <Icon className="" type="account" />
            <div className="data">
              <p className="label">联系人姓名</p>
              <p className="contain">王小明</p>
            </div>
          </div>
          <div className="item">
            <Icon className="" type="viewgallery" />
            <div className="data">
              <p className="label">人员类型</p>
              <p className="contain">机构客户联系人</p>
            </div>
          </div>
          <div className="item">
            <Icon className="" type="favorite" />
            <div className="data">
              <p className="label">是否主要</p>
              <p className="contain">主要</p>
            </div>
          </div>
          {renderRow(arr1, '手机号码', 'mobilephone')}
          {renderRow(arr2, '单位电话', 'phone')}
          {renderRow(arr3, '住宅电话', 'phone')}
          {renderRow(arr4, '电子邮件', 'email')}
        </secttion>
      </div>
    );
  }
}
