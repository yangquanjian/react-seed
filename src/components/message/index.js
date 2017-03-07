/**
 * @file components/message/index.js
 *  无相关结果 / 加载展示组件
 * @author wangjunjun
 */
import React, { PropTypes } from 'react';

import './index.less';

const TYPE_NOTFOUND = 'notfound';
const TYPE_LOADING = 'loading';

const CONFIG = {
  [TYPE_NOTFOUND]: {
    text: '没有相关的结果',
    imgSrc: '/static/img/messageNotfound.png',
  },
  [TYPE_LOADING]: {
    text: '努力加载中...',
    imgSrc: '/static/img/messageLoading.png',
  },
};

function Message(props) {
  const { type } = props;
  const { imgSrc, text } = CONFIG[type];
  return (
    <div>
      <img className="warning-img" src={imgSrc} alt="" />
      <p className="warning-text">{text}</p>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
};

Message.defaultProps = {
  type: 'notfound',
};

export default Message;
