/**
 * @file customer/CustContact.js
 *  客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { NavBar } from 'antd-mobile';
import CustBasicHead from '../../components/customer/CustBasicHead';
import ContactList from '../../components/customer/ContactList';

const mapStateToProps = state => ({
  data: state.customer.contact,
});

const mapDispatchToProps = {
  push: () => {},
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustContact extends PureComponent {
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
      getKey: (key) => {
        const value = this.props.data[key];
        return (value === null) ? '--' : value;
      },
      getArr: (key) => {
        const temp = this.props.data[key];
        return (temp instanceof Array && temp.length > 0) ? temp : [];
      },
      getSectionArr: (arr) => {
        const resultArr = [];
        arr.map((item) => {
          let temp = (this.props.data[item]) ? this.props.data[item] : [];
          if (item === 'idAddress') temp = new Array(temp);
          resultArr.push(temp);
          return true;
        });
        return resultArr;
      },
      isNull: (arr) => {
        if (!arr) return false;
        let bool = !((arr instanceof Array) && arr.length > 0);
        arr.map((item) => {
          if ((item instanceof Array && item.length > 0) || (item && item !== {})) {
            bool = false;
          } else {
            bool = true;
          }
          return true;
        });

        return (bool === true) ? 'no-data' : 'have-data';
      },
    };
  }

  render() {
    const { title, params } = this.props;
    const { getKey } = this.state;
    const LIST_LABEL_ARR = ['tel', 'email', 'address', 'qq', 'wechat'];
    const LIST_KEY_ARR = [
      { label: LIST_LABEL_ARR[0],
        name: '电话',
        child: ['cellPhones', 'workTels', 'homeTels', 'otherTels'],
        childname: ['手机', '单位', '住宅', '其他'],
        data: [],
        nullstyle: '',
      },
      { label: LIST_LABEL_ARR[1],
        name: '邮箱',
        child: ['emailAddresses'],
        childname: [''],
        data: [],
        nullstyle: '',
      },
      { label: LIST_LABEL_ARR[2],
        name: '地址',
        child: ['idAddress', 'homeAddresses', 'workAddresses', 'otherAddresses'],
        childname: ['身份证地址', '家庭住址', '单位地址', '其他地址'],
        data: [],
        nullstyle: '',
      },
      { label: LIST_LABEL_ARR[3],
        name: 'QQ',
        child: ['qqNumbers'],
        childname: [''],
        data: [],
        nullstyle: '',
      },
      { label: LIST_LABEL_ARR[4],
        name: '微信',
        child: ['wechatNumbers'],
        childname: [''],
        data: [],
        nullstyle: '',
      },
    ];
    LIST_KEY_ARR.map((item, index) => {
      const temp = item;
      temp.data = this.state.getSectionArr(temp.child);
      temp.nullstyle = this.state.isNull(temp.child);

      LIST_KEY_ARR[index] = temp;
      return true;
    });

    const testItem = LIST_KEY_ARR.map((item, index) => (
      <div className="info">
        <div className={`item-box ${item.nullstyle}`} key={`sec-${item.label}-${index + 1}`}>
          <h3>{`${item.name}`}</h3>
          <ContactList
            isNull={`${item.nullstyle}`}
            type={`${item.label}`}
            labelArr={item.child}
            nameArr={item.childname}
            dataArr={item.data}
          />
        </div>
      </div>
    ));

    return (
      <div className="custBasic">
        <NavBar
          onLeftClick={() => console.log('onLeftClick')}
        >
          <p>{title}</p>
        </NavBar>

        <CustBasicHead
          type={getKey('custType')}
          sex={getKey('gender')}
          name={getKey('name')}
          number={params.custNumber}
        />

        <secttion className="other">
          {testItem}
        </secttion>
      </div>
    );
  }
}
