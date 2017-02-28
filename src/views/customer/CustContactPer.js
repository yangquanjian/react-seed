/**
 * @file customer/CustContact.js
 *  客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'antd-mobile';
import NavBar from '../../components/common/NavBar';
import Icon from '../../components/common/Icon';
import ContactList from '../../components/customer/ContactList';

const mapStateToProps = state => ({
  data: state.customer.contact,
});

const mapDispatchToProps = {
  push: () => {},
};

const LIST_KEY_ARR = [
  { label: 'tel',
    name: '电话',
    icon: 'phone',
    child: ['cellPhones', 'workTels', 'homeTels', 'otherTels'],
    childname: ['手机', '单位', '住宅', '其他'],
    data: [],
    nullstyle: '',
  },
  { label: 'email',
    name: '邮箱',
    icon: 'email',
    child: ['emailAddresses'],
    childname: [''],
    data: [],
    nullstyle: '',
  },
  { label: 'address',
    name: '地址',
    icon: 'map',
    child: ['idAddress', 'homeAddresses', 'workAddresses', 'otherAddresses'],
    childname: ['身份证地址', '家庭住址', '单位地址', '其他地址'],
    data: [],
    nullstyle: '',
  },
  { label: 'qq',
    name: 'QQ',
    icon: 'qq',
    child: ['qqNumbers'],
    childname: [''],
    data: [],
    nullstyle: '',
  },
  { label: 'wechat',
    name: '微信',
    icon: 'weixin',
    child: ['wechatNumbers'],
    childname: [''],
    data: [],
    nullstyle: '',
  },
];

@connect(mapStateToProps, mapDispatchToProps)
export default class CustContactPer extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: '联系方式',
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getKey(key) {
    const value = this.props.data[key];
    return (value === null) ? '--' : value;
  }

  getSectionArr(arr) {
    const resultArr = [];
    arr.map((item) => {
      let temp = (this.props.data[item]) ? this.props.data[item] : [];
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
    const title = this.getKey('name');
    const dataModel = LIST_KEY_ARR.map(item => ({
      data: this.getSectionArr(item.child),
      nullstyle: this.isNull(this.getSectionArr(item.child)),
    }));

    const testItem = dataModel.map((item, index) => (
      <div className={`info ${item.nullstyle}`} key={`sec-${item.label}-${index + 1}`}>
        <h3>
          <Icon className={item.label} type={item.icon} />
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
      <div className="custBasic">
        <NavBar
          iconName={'left'}
          leftContent={false}
          onLeftClick={() => Modal.alert('onLeftClick')}
        >
          {title}
        </NavBar>

        <secttion className="other">
          {testItem}
        </secttion>
      </div>
    );
  }
}
