/**
 * @file customer/ContactList.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import ContactItem from './ContactItem';

import './contact_list.less';

export default class ContactList extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    isNull: PropTypes.string.isRequired,
    labelArr: PropTypes.array.isRequired,
    nameArr: PropTypes.array.isRequired,
    dataArr: PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: '',
    isNull: '',
    labelArr: [],
    nameArr: [],
    dataArr: [],
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  @autobind
  getList() {
    const arr = [];
    if (!this.props.labelArr) return false;
    this.props.labelArr.map((item, index) => {
      arr.push({
        label: this.props.labelArr[index] || '',
        name: this.props.nameArr[index] || '',
        data: this.props.dataArr[index] || [],
      });
      return true;
    });

    return arr;
  }

  render() {
    const isNull = this.props.isNull;
    const list = this.getList();
    if (!list) return null;
    const listShow = list.map((item, index) => (
      <div className={`data-box len${item.data.length}`} key={`${item.label}-${index + 1}`}>
        <h4 className={`til len${item.data.length}`}>
          {`${item.name}`}
        </h4>
        <ContactItem
          type={`${this.props.type}`}
          data={item.data}
        />
      </div>
    ));

    return (
      <div className={`item-box ${this.props.type}`}>
        <p className={`null-msg ${isNull}`}>
          暂无信息
        </p>
        {listShow}
      </div>
    );
  }
}
