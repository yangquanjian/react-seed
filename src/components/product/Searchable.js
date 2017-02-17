/**
 * @file product/Searchable.js
 *  修饰列表组件，在列表组件上方加搜索框，并封装相应功能
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { SearchBar } from 'antd-mobile';

const SHOW_MODE = {
  NORMAL: 'NORMAL',
  SEARCHING: 'SEARCHING',
  SEARCHED: 'SEARCHED',
};

export default (ComposedComponent) => {
  class SearchableComponent extends PureComponent {

    static propTypes = {
      push: PropTypes.func,
    }

    static defaultProps = {
      push: () => {},
    }

    constructor(props) {
      super(props);

      this.state = {
        mode: SHOW_MODE.NORMAL,
      };
    }

    @autobind
    handleFocus() {
      this.setState({ mode: SHOW_MODE.SEARCHING });
    }

    @autobind
    handleChange(text) {
      if (text === '') {
        this.setState({ mode: SHOW_MODE.SEARCHING });
      }
    }

    @autobind
    handleCancel() {
      this.setState({ mode: SHOW_MODE.NORMAL });
    }

    @autobind
    handleSubmit() {
      this.setState({ mode: SHOW_MODE.SEARCHED });
    }

    render() {
      const { mode } = this.state;
      let mainElems;
      if (mode === SHOW_MODE.NORMAL) {
        mainElems = <ComposedComponent />;
      } else if (mode === SHOW_MODE.SEARCHING) {
        mainElems = (
          <div>搜索推荐</div>
        );
      } else if (mode === SHOW_MODE.SEARCHED) {
        mainElems = (
          <div>搜索结果</div>
        );
      }

      return (
        <div>
          <SearchBar
            placeholder="搜索"
            showCancelButton
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
          {mainElems}
        </div>
      );
    }
  }
  return SearchableComponent;
};
