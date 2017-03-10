/**
 * @file common/PullToRefresh.js
 *  下拉刷新组件
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import DOMScroller from 'zscroller';

import helper from '../../utils/helper';
import './pullToRefresh.less';

const defaultScrollerOptions = {
  scrollingX: false,
};

export default class PullToRefresh extends PureComponent {

  /* eslint-disable */
  static propTypes = {
    loadingFunction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    icon: PropTypes.element.isRequired,
    prefixCls: PropTypes.string,
    loading: PropTypes.element.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    distanceToRefresh: PropTypes.number,
    children: PropTypes.any,
    scrollerOptions: PropTypes.object,
  }
  /* eslint-enable */

  static defaultProps = {
    prefixCls: 'rmc-pull-to-refresh',
    distanceToRefresh: 50,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: !!props.isLoading,
    };
  }

  componentDidMount() {
    const { container, content, props } = this;
    const { prefixCls, loadingFunction } = props;
    const containerClassList = container.classList;
    this.domScroller = new DOMScroller(content, {
      ...defaultScrollerOptions,
      ...props.scrollerOptions,
    });
    const scroller = this.domScroller.scroller;
    scroller.activatePullToRefresh(props.distanceToRefresh,
      () => {
        containerClassList.add(`${prefixCls}-active`);
      },
      () => {
        containerClassList.remove(`${prefixCls}-active`);
        containerClassList.remove(`${prefixCls}-loading`);
      },
      () => {
        containerClassList.add(`${prefixCls}-loading`);
        this.setState({ isLoading: true }, loadingFunction);
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    if (isLoading !== this.props.isLoading) {
      this.setState(
        { isLoading },
        () => {
          if (isLoading === false) {
            this.finishPullToRefresh();
          }
        },
      );
    }
  }

  // componentDidUpdate() {
  //   this.domScroller.reflow();
  // },

  componentWillUnMount() {
    this.domScroller.destroy();
  }

  finishPullToRefresh() {
    this.domScroller.scroller.finishPullToRefresh();
  }

  render() {
    const {
      prefixCls, children, icon, loading, className = '',
      style, contentStyle, contentClassName = '',
    } = this.props;
    return (
      <div
        className={`${className} ${prefixCls}`}
        style={{ ...style, height: helper.getAvailableHeight({ includeNavBar: true }) }}
        ref={ref => (this.container = ref)}
      >
        <div
          ref={ref => (this.content = ref)}
          className={`${prefixCls}-content ${contentClassName}`}
          style={contentStyle}
        >
          <div key="ptr" className={`${prefixCls}-ptr`}>
            <div className={`${prefixCls}-ptr-icon`}>{icon}</div>
            <div className={`${prefixCls}-ptr-loading`}>{loading}</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
