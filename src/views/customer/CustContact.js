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

import './CustCotact.less';

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
      getTypeArr: () => {
        const LIST_LABEL_ARR = ['tel', 'email', 'address', 'qq', 'wechat'];
        const LIST_KEY_ARR = [
          {
            label: LIST_LABEL_ARR[0],
            name: '电话',
            child: ['cellPhones', 'workTels', 'homeTels', 'otherTels'],
            childname: ['手机', '单位', '住宅', '其他'],
            data: [],
          },
          {
            label: LIST_LABEL_ARR[1],
            name: '邮箱',
            child: ['emailAddresses'],
            childname: [''],
            data: [],
          },
          {
            label: LIST_LABEL_ARR[2],
            name: '地址',
            child: ['idAddress', 'homeAddresses', 'workAddresses', 'otherAddresses'],
            childname: ['身份证地址', '家庭住址', '单位地址', '其他地址'],
            data: [],
          },
          {
            label: LIST_LABEL_ARR[3],
            name: 'QQ',
            child: ['qqNumbers'],
            childname: [''],
            data: [],
          },
          {
            label: LIST_LABEL_ARR[4],
            name: '微信',
            child: ['wechatNumbers'],
            childname: [''],
            data: [],
          },
        ];

        const getData = (key) => {
          if (!LIST_LABEL_ARR.includes(key)) return false;

          const resultArr = [];
          const i = LIST_LABEL_ARR.indexOf(key);
          const sectionData = LIST_KEY_ARR[i];
          const childArr = sectionData.child;
          const childNameArr = sectionData.childname;

          for (let j = 0; j < childArr.length; j++) {
            resultArr.push({
              label: childArr[j],
              name: childNameArr[j],
              data: this.props.data[childArr[j]],
            });
          }

          return resultArr;
        };
        return getData;
      },
      getDataArr: () => Object.entries(this.props.data),
    };
  }

  render() {
    const { title } = this.props;
    const { getKey, getArr } = this.state;
    return (
      <div className="custBasic">
        <NavBar>
          <p>{title}</p>
        </NavBar>

        <secttion className="other">
          <CustBasicHead
            type={getKey('custType')}
            sex={getKey('gender')}
            name={getKey('name')}
            number={getKey('custNumber')}
          />

          <div className="info">
            <h3>电话：</h3>
            <ContactList
              isaddress="false"
              label="cellPhones"
              name="手机"
              data={getArr('cellPhones')}
            />
            <ContactList
              isaddress="false"
              label="workTels"
              name="单位"
              data={getArr('workTels')}
            />
            <ContactList
              isaddress="false"
              label="homeTels"
              name="住宅"
              data={getArr('homeTels')}
            />
            <ContactList
              isaddress="false"
              label="otherTels"
              name="其他"
              data={getArr('otherTels')}
            />
          </div>
          <div className="info">
            <h3>地址：</h3>
            <ContactList
              isaddress="true"
              label="idAddress"
              name="身份证地址"
              data={getArr('idAddress')}
            />
            <ContactList
              isaddress="true"
              label="homeAddresses"
              name="家庭住址"
              data={getArr('homeAddresses')}
            />
            <ContactList
              isaddress="true"
              label="workAddresses"
              name="单位地址"
              data={getArr('workAddresses')}
            />
            <ContactList
              isaddress="true"
              label="otherAddresses"
              name="其他地址"
              data={getArr('otherAddresses')}
            />
          </div>
          <div className="info">
            <h3>邮件：</h3>
            <ContactList
              isaddress="false"
              label="emailAddresses"
              name=""
              data={getArr('emailAddresses')}
            />
          </div>
          <div className="info">
            <h3>QQ：</h3>
            <ContactList
              isaddress="false"
              label="qqNumbers"
              name=""
              data={getArr('qqNumbers')}
            />
          </div>
          <div className="info">
            <h3>微信：</h3>
            <ContactList
              isaddress="false"
              label="wechatNumbers"
              name=""
              data={getArr('wechatNumbers')}
            />
          </div>
        </secttion>
      </div>
    );
  }
}
