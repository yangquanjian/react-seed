/**
 * @file customer/ContactOrgDetail.js
 *  机构客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Modal } from 'antd-mobile';
import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import './ContactOrgDetail.less';

const mapStateToProps = state => ({
  data: state.customer.contactList,
});

const mapDispatchToProps = {
  push: () => {},
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactOrgDetail extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
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
        <div className="btn" onClick={Modal.alert(item.contactValue)}>发送邮件</div>
      </div>
    ));
  }

  render() {
    const { title } = this.props;
    const renderRow = this.renderRow;
    const arr1 = [
      {
        mainFlag: false,
        contactType: '104120',
        contactValue: '88888888',
        rowId: 'COMMI-20170107-04824803699',
        validFlag: true,
      },
      {
        mainFlag: false,
        contactType: '104120',
        contactValue: '88888888',
        rowId: 'COMMI-20170107-04824803699',
        validFlag: true,
      },
      {
        mainFlag: false,
        contactType: '104120',
        contactValue: '88888888',
        rowId: 'COMMI-20170107-04824803699',
        validFlag: true,
      }];
    const arr2 = arr1;
    const arr3 = arr1;
    const arr4 = arr1;

    return (
      <div className="contact-org-detail">
        <NavBar
          iconName={'left'}
          leftContent={false}
          onLeftClick={() => Modal.alert('onLeftClick')}
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
