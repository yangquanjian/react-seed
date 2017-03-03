/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import _ from 'lodash';

import SearchList from '../../components/customer/SearchList';
import Searchable from '../../components/customer/Searchable';

const mapStateToProps = state => ({
  searchInfo: state.search.customer,
  loading: state.loading.models.search,
});

const mapDispatchToProps = {
  doSearch: query => ({
    type: 'search/customer',
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
    doSearch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    searchInfo: PropTypes.object,
  }

  static defaultProps = {
    searchInfo: { page: {}, list: {} },
  }

  componentWillReceiveProps(nextProps) {
    const { location: { query } } = nextProps;
    const { location: preLocation, doSearch } = this.props;
    // 如果url上关键词发生变化，则触发新的搜索请求
    if (!_.isEqual(query, preLocation.query)) {
      doSearch({
        ...query,
        page: 1,
      });
    }
  }

  render() {
    return (
      <SearchList {...this.props} />
    );
  }
}
