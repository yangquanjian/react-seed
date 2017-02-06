/**
 * @file profile/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes } from 'react';
import NavBar from '../../components/common/NavBar';

export default function Profile(props) {
  const { title } = props;
  return (
    <div className="page-profile">
      <NavBar iconName={false} leftContent={false}>{title}</NavBar>
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  title: '个人设置',
};
