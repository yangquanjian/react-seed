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
      <p><Link to="/custbasic/per/1">个人客户 -- 基本信息</Link></p>
      <p><Link to="/custbasic/org/1">机构客户 -- 基本信息</Link></p>
      <p><Link to="/custContact/1">个人客户 -- 联系方式</Link></p>

      <Chart />
    </div>
  );
}

CustomerHome.propTypes = {
  title: PropTypes.string,
};

CustomerHome.defaultProps = {
  title: '客户首页',
};
