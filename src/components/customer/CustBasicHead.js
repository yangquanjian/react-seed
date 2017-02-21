/**
 * @file customer/CustBasicHead.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import Icon from '../common/Icon';
import './CustBasicHead.less';

export default class CustomerForm extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
  }

  static defaultProps = {
    sex: '男',
    name: '--',
    number: '--',
  }

  constructor(props) {
    super(props);
    this.state = {
      getPhoto: () => {
        let photoStyle;
        if (this.props.type === 'org') {
          photoStyle = 'headIcon orgHead';
        } else if (this.props.sex === '女') {
          photoStyle = 'headIcon perHead womanIcon';
        } else {
          photoStyle = 'headIcon perHead manIcon';
        }
        return photoStyle;
      },
      getPhoto1: () => {
        let photoStyle;
        if (this.props.type === 'org') {
          photoStyle = <Icon className="" type="renqun" />;
        } else if (this.props.sex === '女') {
          photoStyle = <Icon className="" type="wode" />;
        } else {
          photoStyle = <Icon className="" type="wo" />;
        }
        return photoStyle;
      },
    };
  }

  render() {
    const photo = this.state.getPhoto();
    const photo1 = this.state.getPhoto1();
    return (
      <section className="baseHead">
        <div className={photo}>{this.props.type}</div>
        {photo1}
        <div className="baseName">{this.props.name}</div>
        <p className="baseNo">{this.props.number}</p>
      </section>
    );
  }
}
