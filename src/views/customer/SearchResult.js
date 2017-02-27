/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';

import SearchList from '../../components/customer/SearchList';
import Searchable from '../../components/customer/Searchable';

const mapStateToProps = state => ({
  list: state.customer.searchList,
});

const mapDispatchToProps = {
  getList: query => ({
    type: 'customer/search',
    payload: query,
  }),
  push: routerRedux.push,
  replace: routerRedux.replace,
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@Searchable
export default class CustomerHome extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    list: PropTypes.array,
  }

  static defaultProps = {
    list: [],
  }

  constructor(props) {
    super(props);

    const { list } = props;
    this.state = {
      list,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { list, location: { query } } = nextProps;
    const { location: preLocation, getList } = this.props;
    // 如果url上关键词发生变化，则触发新的搜索请求
    const { keyword } = query;
    if (keyword !== preLocation.query.keyword) {
      getList({ keyword });
    }
    // 更新列表
    if (this.props.list !== list) {
      this.setState({ list });
    }
  }

  render() {
    return (
      <SearchList {...this.props} {...this.state} />
    );
  }
}
