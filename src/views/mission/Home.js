/**
 * @file mission/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
    </div>
  );
}

MissionHome.propTypes = {
  title: PropTypes.string,
};

MissionHome.defaultProps = {
  title: '理财平台',
};
