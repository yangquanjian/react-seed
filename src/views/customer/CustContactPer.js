/**
 * @file customer/CustContact.js
 *  客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import ContactList from '../../components/customer/ContactList';
import './CustContactPer.less';

const mapStateToProps = state => ({
  data: state.customer.contact,
});

const mapDispatchToProps = {
  push: routerRedux.push,
  goBack: routerRedux.goBack,
};

const LIST_KEY_ARR = [
  { label: 'tel',
    name: '电话',
    icon: 'phone',
    child: ['cellPhones', 'workTels', 'homeTels', 'otherTels'],
    childname: ['手机', '单位', '住宅', '其他'],
  },
  { label: 'email',
    name: '邮箱',
    icon: 'email',
    child: ['emailAddresses'],
    childname: [''],
  },
  { label: 'address',
    name: '地址',
    icon: 'map',
    child: ['idAddress', 'homeAddresses', 'workAddresses', 'otherAddresses'],
    childname: ['身份证地址', '家庭住址', '单位地址', '其他地址'],
  },
  { label: 'qq',
    name: 'QQ',
    icon: 'qq',
    child: ['qqNumbers'],
    childname: [''],
  },
  { label: 'wechat',
    name: '微信',
    icon: 'weixin',
    child: ['wechatNumbers'],
    childname: [''],
  },
];

@connect(mapStateToProps, mapDispatchToProps)
export default class CustContactPer extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '联系方式',
    goBack: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getBaseKey(key) {
    const data = this.props.data;
    if (!data) return null;
    const value = data.custBaseInfo[key];
    return (!value) ? '--' : value;
  }

  getSectionArr(arr) {
    if (!arr) return false;
    let data = this.props.data;
    if (!data) return null;
    const resultArr = [];
    data = (this.props.params.custSor === 'per') ? data.perCustomerContactInfo : [];
    arr.map((item) => {
      let temp = (data[item]) ? data[item] : [];
      if (item === 'idAddress') temp = new Array(temp);
      resultArr.push(temp);
      return true;
    });
    return resultArr;
  }

  isNull(arr) {
    if (!arr) return false;
    let bool = 0;
    arr.map((item) => {
      if (item instanceof Array && item.length > 0) bool++;
      return true;
    });

    return (bool > 0) ? 'have-data' : 'no-data';
  }

  render() {
    const { goBack } = this.props;
    const title = this.getBaseKey('custName');
    const dataModel = LIST_KEY_ARR.map(item => ({
      data: this.getSectionArr(item.child),
      nullstyle: this.isNull(this.getSectionArr(item.child)),
      ...item,
    }));

    const dataShow = dataModel.map((item, index) => (
      <div className={`info ${item.nullstyle}`} key={`sec-${item.label}-${index + 1}`}>
        <h3>
          <Icon className={item.label} type={`${item.icon}`} />
          {`${item.name}`}
        </h3>
        <ContactList
          isNull={`${item.nullstyle}`}
          type={`${item.label}`}
          labelArr={item.child}
          nameArr={item.childname}
          dataArr={item.data}
        />
      </div>
    ));

    return (
      <div className="cust-contact">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          <p className="mid-contain">{title}</p>
        </NavBar>

        <secttion className="other">
          {dataShow}
        </secttion>
      </div>
    );
  }
}
