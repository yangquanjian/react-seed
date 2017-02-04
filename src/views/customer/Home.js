/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function CustomerHome(props) {
  return (
    <div>
      <p>{ props.title }</p>
      <p><Link to="/customer/1">修改客户信息</Link></p>
    </div>
  );
}

CustomerHome.propTypes = {
  title: PropTypes.string,
};

CustomerHome.defaultProps = {
  title: '客户首页',
};
