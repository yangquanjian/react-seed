/**
 * @file customer/MenuBar.js
 *  客户详情下方菜单按钮
 * @author xuxiaoqin
 */
import React, { PropTypes, PureComponent } from 'react';
import TaskMenu from './TaskMenu';

export default options => (ComposedComponent) => {
  const { title, isShowMenu } = options;
  class MenuBarComponent extends PureComponent {
    static propTypes = {
      push: PropTypes.func,
      location: PropTypes.object.isRequired,
    }

    static defaultProps = {
      push: () => { },
    }

    onLeftClick(query) {
      const { push, custId, custNumber, custSor } = query;
      push(`/custBasic/${custNumber}/${custSor}/${custId}`);
    }

    onRightClick(query) {
      const { push, custId, custNumber, custSor } = query;
      push(`/custBasic/${custNumber}/${custSor}/${custId}`);
    }

    render() {
      const { location: { query } } = this.props;
      // const { custId, custNumber, custSor } = query;
      return (
        <div>
          <TaskMenu
            status={isShowMenu}
            onLeftClick={() => { this.onLeftClick(query); }}
            title={title}
            onRightClick={() => { this.onRightClick(query); }}
          />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
  return MenuBarComponent;
};
