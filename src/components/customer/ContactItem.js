/**
 * @file customer/BasicList.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';

export default class ContactItem extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: '',
    data: [],
  };

  render() {
    const type = this.props.type;
    const arr = this.props.data;
    const rowItem = arr.map((item, index) => {
      if (this.props.type === 'address') {
        return (
          <li key={`${type}-${index + 1}`}>
            <p className={`info-item ${type}`}>
              <span>{`${item.province}${item.city}${item.address}`}</span>
            </p>
          </li>);
      }
      return (
        <li key={`${type}-${index + 1}`}>
          <p className={`info-item ${type}`}>
            <span>{`${item.contactValue}`}</span>
          </p>
        </li>
      );
    });

    return (
      <ul className="item-box">
        { rowItem }
      </ul>
    );
  }
}
