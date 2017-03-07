import React, { PropTypes, PureComponent } from 'react';

import './index.less';

export default class Message extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'notfound',
  };


  constructor(props) {
    super(props);
    this.state = {
      text: '没有相关的结果',
      imgSrc: '/static/img/messageNotfound.png',
    };
  }

  componentWillMount() {
    const { type } = this.props;
    switch (type) {
      case 'notfound':
        this.setState({
          text: '没有相关的结果',
          imgSrc: '/static/img/messageNotfound.png',
        });
        break;
      case 'loading':
        this.setState({
          text: '努力加载中...',
          imgSrc: '/static/img/messageLoading.png',
        });
        break;
      default:
        this.setState({
          text: '没有相关的结果',
          imgSrc: '/static/img/messageNotfound.png',
        });
    }
  }

  render() {
    const { imgSrc, text } = this.state;
    return (
      <div>
        <img className="warning-img" src={imgSrc} alt="" />
        <p className="warning-text">{text}</p>
      </div>
    );
  }
}
