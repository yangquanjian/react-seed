/**
 * @file message/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';

export default function Message(props) {
  return <p>{ props.title }</p>;
}

Message.propTypes = {
  title: PropTypes.string,
};

Message.defaultProps = {
  title: '消息中心',
};
