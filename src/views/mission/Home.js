/**
 * @file mission/Home.js
 * @author fengwencong
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import { Drawer } from 'antd-mobile';

import NavBar from '../../components/common/NavBar';
import CenterList from '../../components/mission/CenterList';
import Filter from '../../components/customer/Filter';

const mapStateToProps = state => ({
  missionCenter: state.mission.missionCenter,
  isLoading: state.loading.models.customer,
});

const getCenterFunction = query => ({
  type: 'mission/getCenter',
  payload: query || {},
});

const mapDispatchToProps = {
  getCenter: getCenterFunction,
  // 提供给下拉刷新组件
  refresh: getCenterFunction,
  push: routerRedux.push,
  replace: routerRedux.replace,
};

const appContainer = document.querySelector('#app');

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class MissionHome extends PureComponent {
  static propTypes = {
    missionCenter: PropTypes.object,
    getCenter: PropTypes.func,
    location: PropTypes.object,
    replace: PropTypes.func,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    missionCenter: {},
    getCenter: () => { },
    location: {},
    replace: () => { },
    push: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      position: 'right',
      title: '任务中心',
    };
  }

  componentWillMount() {
    appContainer.addEventListener('touchmove', this.handleTouch, false);
  }

  componentWillUnmount() {
    appContainer.removeEventListener('touchmove', this.handleTouch, false);
  }

  @autobind
  onOpenChange() {
    this.setState({ open: !this.state.open });
  }

  @autobind
  handleTouch(event) {
    const { open } = this.state;
    if (open) {
      event.preventDefault();
    }
  }

  render() {
    const {
      missionCenter,
      getCenter,
      location,
      replace,
      push,
    } = this.props;
    const { title } = this.state;
    const sidebar = (
      <Filter
        onOpenChange={this.onOpenChange}
        location={location}
        replace={replace}
      />
    );
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    const bar = document.querySelector('.am-tab-bar-bar');
    const footerHeight = bar ? bar.offsetHeight : 0;
    return (
      <section className="page-mission">
        <NavBar
          iconName={false}
          leftContent={false}
        >{title}</NavBar>
        <CenterList
          data={missionCenter}
          getCenter={getCenter}
          location={location}
          replace={replace}
          push={push}
        />
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          style={{ maxHeight: document.documentElement.clientHeight - footerHeight }}
          dragHandleStyle={{ display: 'none' }}
          touch={false}
          {...drawerProps}
        >
          .
        </Drawer>
      </section>
    );
  }
}
