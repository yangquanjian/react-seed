/**
 * @file customer/MenuBar.js
 *  客户详情下方菜单按钮
 * @author xuxiaoqin
 */
import React, { PropTypes, PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'react-redux';
import TaskMenu from '../../components/customer/TaskMenu';
import Detail from './Detail';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MenuBarComponent extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    title: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    push: () => { },
    title: {
      leftContent: '邮件联系',
      rightContent: '直接完成',
    },
    status: '',
  }

  render() {
    const { location: { query }, title, push } = this.props;
    const { status, ...others } = query;

    return (
      <div>
        <Detail {...this.props} />
        <TaskMenu
          taskStatus={status}
          push={push}
          title={title}
          {...others}
        />
      </div>
    );
  }
}
