/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavBar from '../../components/common/NavBar';

export default function CustomerHome(props) {
  return (
    <div className="page-customer">
      <NavBar
        iconName={false}
        leftContent={false}
      >{props.title}</NavBar>
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
