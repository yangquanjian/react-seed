/**
 * @file mission/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';

export default function Mission(props) {
  const { title } = props;
  return (
    <p>{ title }</p>
  );
}

Mission.propTypes = {
  title: PropTypes.string.isRequired,
};

Mission.defaultProps = {
  title: '任务',
};
