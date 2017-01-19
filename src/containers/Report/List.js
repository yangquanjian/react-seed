/**
 * @file Custom/CustomList.js
 * @author maoquan
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <p>报表</p>
    );
  }
}
