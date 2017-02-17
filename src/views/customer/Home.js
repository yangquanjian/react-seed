/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import NavBar from '../../components/common/NavBar';
import Chart from '../../components/customer/Chart';

export default function CustomerHome(props) {
  return (
    <div className="page-customer">
      <NavBar
        iconName={false}
        leftContent={false}
      >{props.title}</NavBar>
      <p><Link to="/customer/1">修改客户信息</Link></p>
      <p><Link to="/customer/detail?custId=1">查看客户详细信息</Link></p>
    </div>
  );
}

CustomerHome.propTypes = {
  title: PropTypes.string,
};

CustomerHome.defaultProps = {
  title: '客户首页',
};
