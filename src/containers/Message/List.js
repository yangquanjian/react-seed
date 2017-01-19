/**
 * @file Custom/CustomList.js
 * @author maoquan
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class CustomList extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <p>消息中心</p>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomList);
