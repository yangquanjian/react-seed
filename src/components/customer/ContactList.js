/**
 * @file customer/ContactList.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
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
      getList: () => {
        const arr = [];
        this.props.labelArr.map((item, index) => {
          arr.push({
            label: this.props.labelArr[index],
            name: this.props.nameArr[index],
            data: this.props.dataArr[index],
          });
          return true;
        });

        return arr;
      },
    };
  }

  render() {
    const isNull = this.props.isNull;
    const list = this.state.getList();
    const listShow = list.map((item, index) => (
      <div key={`${item.label}-${index + 1}`}>
        <h4 className={`til ${(item.length > 0) ? 'have-data' : 'no-data'}`}>{`${item.name}`}</h4>
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
