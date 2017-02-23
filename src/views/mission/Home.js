/**
 * @file mission/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import NavBar from '../../components/common/NavBar';

export default function MissionHome(props) {
  return (
    <div className="page-mission">
      <NavBar
        iconName={false}
        leftContent={false}
      >{props.title}</NavBar>
      <p>{ props.title }</p>
      <p><Link to="/mission/1">任务详情</Link></p>
      <p><Link to="/custbasic/02336887/per/1">个人客户 -- 基本信息</Link></p>
      <p><Link to="/custbasic/02004642/org/1">机构客户 -- 基本信息</Link></p>
      <p><Link to="/custContact/02004642">个人客户 -- 联系方式</Link></p>
    </div>
  );
}

MissionHome.propTypes = {
  title: PropTypes.string,
};

MissionHome.defaultProps = {
  title: '理财平台',
};
