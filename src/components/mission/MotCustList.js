/**
 * @file customer/DetailHeader.js
 * @author liutingting
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
// import classnames from 'classnames';
// import _ from 'lodash';
import './motCustList.less';
import Icon from '../common/Icon';

export default class MotCustList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    motTaskId: PropTypes.string.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    list: [],
    motTaskId: '',
    push: () => { },
  }

  @autobind
  goCust(custObj) {
    const { push, motTaskId } = this.props;
    const { custId, brokerNumber, custType } = custObj || {};
    push(`/customer/detail?custId=${custId}&custNumber=${brokerNumber}&custSor=${custType}&motTaskId=${motTaskId}`);
  }

  @autobind
  more(item) {
    const node = this[item];
    const { childNodes = [], offsetTop = 0, offsetLeft = 0 } = node || {};
    const child = childNodes[0] || {};
    const text = child.innerText || '';
    if (!text) return null;
    console.log(offsetTop);
    console.log(offsetLeft);
    return true;
    // console.log('more... ' + text + '/\n' + '绝对位置：top=' + offsetTop + ' left=' + offsetLeft);
  }

  render() {
    return (
      <div className="mot-task-list">
        <div className="item per">
          <div className="top" onClick={() => { this.goCust({ custId: '1-3AB90H2', brokerNumber: '666600983047', custType: 'per' }); }}>
            <i className="photo" />
            <div className="info">
              <p className="cust-name">张三</p>
              <div>
                <i className="card goldCard" />
                <span className="cust-num">666600123456</span>
                <span className="sex">男 | 52 岁</span>
                <span className="btn">高净值客户</span>
              </div>
            </div>
            <Icon className="more" type="more" />
          </div>
          <div className="bot" ref={div => (this['item-0'] = div)} onClick={() => { this.more('item-0'); }}>
            <p><Icon type="information" />樊芸代表发言说，互联网给百姓生活提供了很大便利</p>
          </div>
        </div>

        <div className="item per">
          <div className="top" onClick={() => { this.goCust({ custId: '1-3AB90H2', brokerNumber: '666600983047', custType: 'per' }); }}>
            <i className="photo" />
            <div className="info">
              <p className="cust-name">伊莉萨白.奥斯特洛夫斯基.奥斯特洛夫斯基</p>
              <div>
                <i className="card goldCard" />
                <span className="cust-num">02004567</span>
                <span className="sex">男 | 52 岁</span>
                <span className="btn">高净值客户</span>
              </div>
            </div>
            <Icon className="more" type="more" />
          </div>
          <div className="bot" ref={div => (this['item-1'] = div)} onClick={() => { this.more('item-1'); }}>
            <p><Icon type="information" />樊芸代表发言说，互联网给百姓生活提供了很大便利</p>
          </div>
        </div>

        <div className="item org">
          <div className="top" onClick={() => { this.goCust({ custId: '1-3AB90H2', brokerNumber: '666600983047', custType: 'per' }); }}>
            <i className="photo" />
            <div className="info">
              <p className="cust-name">有限公司</p>
              <div>
                <i className="card emptyCard" />
                <span className="cust-num">02004567</span>
                <span className="btn">高净值客户</span>
              </div>
            </div>
            <Icon className="more" type="more" />
          </div>
          <div className="bot" ref={div => (this['item-2'] = div)} onClick={() => { this.more('item-2'); }}>
            <p><Icon type="information" />樊芸代表发言说，互联网给百姓生活提供了很大便利，但网约车等业务也出现了一些新的问题。总书记当场要求有关部门予以落实</p>
          </div>
        </div>
      </div>
    );
  }
}
