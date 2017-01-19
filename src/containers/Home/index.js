/**
 * @file Home/Index.js
 * @author maoquan
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <p>首页</p>
        <p><Link to="/message">消息中心</Link></p>
      </div>
    );
  }
}
