/**
 * @file Base/BaseList.js
 * @author maoquan
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as listActions from '../../actions/listActions';

/**
 * 返回一个空对象的空函数
 */
const noop = () => ({});

/**
* 合并多个`mapStateToProps`或`mapDispatchToProps`中返回的对象
* 在子组件里面通过`connect`绑定`mapStateToProps`或`mapDispatchToProps`
* 然后重写`BaseComponent`中里的Props
*
* @param {...Function} args 多个函数
*
* @return {Function}
*/
const combineProps = (...args) => (...props) => (
  args.reduce(
    (combinedProps, mapFunction) => Object.assign(combinedProps, mapFunction(...props)),
    {} // eslint-disable-line
  )
);

export default (childState = noop, childAction = noop) => (ComposedComponent) => {
  class BaseList extends Component {

    static propTypes = {
      entityName: PropTypes.string.isRequired,
      getListData: PropTypes.func.isRequired,
    }

    componentDidMount() {
      const { entityName, getListData } = this.props;
      getListData(entityName);
    }

    @autobind
    handleSearch() {
    }

    render() {
      return (
        <ComposedComponent
          onSearch={this.handleSearch}
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    parent: 2,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    getListData: (...args) => dispatch(listActions.getListData(...args)),
  });

  const combinedProps = combineProps(mapStateToProps, childState);
  const combinedDispatch = combineProps(mapDispatchToProps, childAction);

  return connect(combinedProps, combinedDispatch)(BaseList);
};
