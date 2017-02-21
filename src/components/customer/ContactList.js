/**
 * @file customer/BasicList.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';

import './ContactList.less';

export default class ContactList extends PureComponent {

  static propTypes = {
    isaddress: PropTypes.boolean,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    data: [],
    isaddress: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      getTil: () => (<h4>{this.props.name}</h4>),
    };
  }

  render() {
    const { getTil } = this.state;
    const arr = (this.props.data instanceof Array) ? this.props.data : new Array([this.props.data]);
    const rowItem = arr.map((item) => {
      if (this.props.isaddress === true) {
        return (
          <li className="info-item address" key={`${item.rowId}`}>
            <p><span>{`${item.province}${item.city}${item.address}`}</span></p>
          </li>);
      }
      return (
        <li className="info-item no-address" key={`${item.rowId}`}>
          <p><span>{`${item.contactValue}`}</span></p>
        </li>
      );
    });

    return (
      <div className="item-box">
        {getTil()}
        <ul>
          {rowItem}
        </ul>
      </div>
    );
  }
}
