/**
 * @file customer/ContactOrgDetail.js
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
import './ContactOrgDetail.less';

const mapStateToProps = state => ({
  data: state.customer.contactList,
});

const mapDispatchToProps = {
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactOrgDetail extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
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
  getData(rowId) {
    const { data = {} } = this.props;
    const { custId = '--' } = this.props.params;
    if (_.isEmpty(data[custId])) return null;
    const dataModel = data[custId].orgCustomerContactInfoList || [];
    if (!(dataModel instanceof Array) || (dataModel instanceof Array && dataModel.length < 1)) {
      return null;
    }
    let result = null;
    dataModel.map((item) => {
      if (item.rowId === rowId) {
        result = item;
      }
      return true;
    });
    return result;
  }

  @autobind
  renderRow(arr, label = '信息', icon = 'viewgallery') {
    if (!arr || !(arr instanceof Array) || (arr instanceof Array && arr.length < 1)) {
      return (<div className="item">
        <Icon className="" type={icon} />
        <div className="data">
          <p className="label">{label}</p>
          <p className="contain">暂无信息</p>
        </div>
        <hr />
      </div>);
    }
    return arr.map((item, index) => (
      <div className={`item ${icon}`} key={`${icon}-${index + 1}`}>
        <Icon className="" type={icon} />
        <div className="data">
          <p className="label">{label}</p>
          <p className="contain">{item.contactValue}</p>
        </div>
        <div className="btn" onClick={() => { console.log(item.contactValue); }}>发送邮件</div>
        <hr />
      </div>
    ));
  }

  render() {
    const { title, goBack } = this.props;
    const rowId = this.props.params.rowId;
    const data = this.getData(rowId);
    if (!data) return null;
    const renderRow = this.renderRow;
    const arr1 = data.cellPhones;
    const arr2 = data.workTels;
    const arr3 = data.homeTels;
    const arr4 = data.emailAddresses;

    return (
      <div className="contact-org-detail">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          {title}
        </NavBar>

        <section className="contain">
          <div className="item">
            <Icon className="" type="account" />
            <div className="data">
              <p className="label">联系人姓名</p>
              <p className="contain">{data.name || '--'}</p>
            </div>
            <hr />
          </div>
          <div className="item">
            <Icon className="" type="viewgallery" />
            <div className="data">
              <p className="label">人员类型</p>
              <p className="contain">{data.custRela || '--'}</p>
            </div>
            <hr />
          </div>
          <div className="item">
            <Icon className="" type="favorite" />
            <div className="data">
              <p className="label">是否主要</p>
              <p className="contain">{(data.mainFlag === true) ? '是' : '否'}</p>
            </div>
            <hr />
          </div>
          {renderRow(arr1, '手机号码', 'mobilephone')}
          {renderRow(arr2, '单位电话', 'phone')}
          {renderRow(arr3, '住宅电话', 'phone')}
          {renderRow(arr4, '电子邮件', 'email')}
        </section>
      </div>
    );
  }
}
