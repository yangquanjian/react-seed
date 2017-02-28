/**
 * @file customer/CustContactOrg.js
 *  机构客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

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
      getKey: (key1, key2) => {
        const value1 = this.props.data[key1];
        const value2 = (value1) ? value1[key2] : undefined;
        return (value2 === undefined) ? '--' : value2;
      },
      getContactList: () => {
        const temp = this.props.data.orgCustomerContactInfoList;
        return (temp instanceof Array && temp.length > 0) ? temp : [];
      },
      getMainContact: (arr) => {
        if (!arr || arr.length < 1) return null;
        let mainObj = null;
        arr.map((item) => {
          if (item.mainFlag === true) mainObj = item;
          return true;
        });
        return mainObj;
      },
      getOtherContact: (arr) => {
        if (!arr || arr.length < 1) return [];
        const otherArr = arr.map((item, index) => (
          {
            key: index + 1,
            ...item,
          }
        ));
        return otherArr;
      },
    };
  }

  handleClick(data) {
    const { push } = this.props;
    push({ pathname: '/ContactOrgDetail', state: { ...data } });
  }

  render() {
    const { goBack } = this.props;
    const title = this.props.data.custBaseInfo.custName;
    const contactArr = this.props.data.orgCustomerContactInfoList;
    const mainData = this.state.getMainContact(contactArr);
    const otherData = this.state.getOtherContact(contactArr);

    const mainShow = () => {
      if (mainData === null) {
        return (
          <div className="item">
            <p className="left nodata"><Icon className="left" type="shenfenzheng" />暂无信息</p>
          </div>
        );
      }
      return (
        <div className="item" data={mainData} onClick={this.handleClick(mainData)}>
          <p className="left"><Icon className="" type="shenfenzheng" />{(mainData.name) ? mainData.name : '--'}</p>
          <p className="right">{(mainData.custRela) ? mainData.custRela : '--'}</p>
          <Icon className="more" type="more" />
        </div>
      );
    };
    const otherShow = otherData.map(item => (
      <div className="other item" data={item} key={item.key} onClick={this.handleClick(item)}>
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
          {title}
        </NavBar>
        <secttion className="contain">
          <div className="main">
            {mainShow()}
          </div>
          <div className="other">
            {otherShow}
          </div>
        </secttion>
      </div>
    );
  }
}
