/**
 * @file mission/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Mission(props) {
  return (
    <div>
      <p>{ props.title }</p>
      <p><Link to="/message">消息中心</Link></p>
    </div>
  );
}

Mission.propTypes = {
  title: PropTypes.string,
};

Mission.defaultProps = {
  title: '首页',
};
