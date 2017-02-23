/**
 * @file customer/CustBasicHead.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import Icon from '../common/Icon';
import './cust_basic_head.less';

export default class CustomerForm extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
  };

  static defaultProps = {
    type: 'per',
    sex: '男',
    name: '--',
    number: '--',
  };

  constructor(props) {
    super(props);
    this.state = {
      getPhoto: () => {
        let photoStyle;
        if (this.props.type === 'org') {
          photoStyle = <Icon className="" type="kehu" />;
        } else if (this.props.sex === '女') {
          photoStyle = <Icon className="" type="xinzengkehu" />;
        } else {
          photoStyle = <Icon className="" type="iconfont-addcustmor" />;
        }
        return photoStyle;
      },
    };
  }

  render() {
    const photo = this.state.getPhoto();
    return (
      <section className="baseHead">
        <div className="headIcon">{photo}</div>
        <div className="baseName">{this.props.name}</div>
        <p className="baseNo">{this.props.number}</p>
      </section>
    );
  }
}
