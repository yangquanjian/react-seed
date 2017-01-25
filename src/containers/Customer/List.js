/**
 * @file custom/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component } from 'react';

export default class CustomList extends Component {

  static propTypes = {

  }

  componentDidMount() {
    // you can scroll to the specified position
    // this.refs.lv.refs.listview.scrollTo(0, 200);
  }

  render() {
    return (
      <p>客户列表</p>
    );
  }
}
