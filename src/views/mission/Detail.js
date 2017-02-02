/**
 * @file mission/Detail.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';

export default function MissionDetail(props) {
  return <p>{ props.title }</p>;
}

MissionDetail.propTypes = {
  title: PropTypes.string,
};

MissionDetail.defaultProps = {
  title: '任务详情',
};
