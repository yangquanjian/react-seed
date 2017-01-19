/**
 * @file Custom/CustomList.js
 * @author maoquan
 */

import React, { Component } from 'react';

export default class CustomList extends Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);
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
