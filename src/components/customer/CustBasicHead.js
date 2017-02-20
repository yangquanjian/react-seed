/**
 * @file customer/CustBasicHead.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
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
    };
  }

  render() {
    const photo = this.state.getPhoto();
    return (
      <section className="baseHead">
        <div className={photo}>{this.props.type}</div>
        <div className="baseName">{this.props.name}</div>
        <p className="baseNo">{this.props.number}</p>
      </section>
    );
  }
}
