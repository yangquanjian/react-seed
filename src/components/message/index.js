import React, { PropTypes, PureComponent } from 'react';

import './index.less';

export default class Message extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    imgName: PropTypes.string,
  };

  static defaultProps = {
    text: '没有相关的结果',
    imgName: 'messageNotfound.png',
  };

  render() {
    const { text, imgName } = this.props;
    const imgSrc = `/static/img/${imgName}`;
    return (
      <div>
        <img className="warning-img" src={imgSrc} alt="" />
        <p className="warning-text">{text}</p>
      </div>
    );
  }
}
