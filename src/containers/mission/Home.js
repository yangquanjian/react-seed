/**
 * @file mission/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function MissionHome(props) {
  return (
    <div>
      <p>{ props.title }</p>
      <p><Link to="/mission/1">任务详情</Link></p>
    </div>
  );
}

MissionHome.propTypes = {
  title: PropTypes.string,
};

MissionHome.defaultProps = {
  title: '任务默认首页',
};
