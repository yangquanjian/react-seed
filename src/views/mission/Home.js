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
      <br />
      <p><Link to="/mission/taskDetail?motTaskId=1">任务中心 -- 任务详情</Link></p>
    </div>
  );
}

MissionHome.propTypes = {
  title: PropTypes.string,
};

MissionHome.defaultProps = {
  title: '理财平台',
};
