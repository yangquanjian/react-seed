/**
 * @file App/index.js
 * @author yankun01
 */

import React, {Component} from 'react'
import { TabBar } from 'antd-mobile';
import {autobind} from 'core-decorators';
import { withRouter } from 'react-router'

import {Actions} from '../../actions/globalActions'
import tabConfig from '../../config/tabConfig'

class App extends Component  {

    static propTypes = {
        children: React.PropTypes.node,
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
    }

    onChange(item) {
        const {router} = this.props;
        const {key} = item;
        router.push('/' + key);
    }

    render() {
        const { children } = this.props;
        let findTabItem = false;
        let activeKey;
        if (children) {
            tabConfig.forEach(
                item => {
                    let {component} = item;
                    if (component === children.type
                       || component.type === children.type) {
                        // better immutable
                        findTabItem = true;
                        item.component = children;
                        activeKey = item.key;
                    }
                }
            );
        }
        const tabs = tabConfig.map(
            item => (
                <TabBar.Item
                    key={item.key}
                    title={item.label}
                    icon={require('../../components/tab-bar/images/zhifubao.png')}
                    selectedIcon={require('../../components/tab-bar/images/zhifubao_sel.png')}
                    selected={activeKey === item.key}
                    badge={1}
                    onPress={() => {
                        this.onChange(item);
                    }}
                >
                    {item.component}
                </TabBar.Item>
            )
        );
        return findTabItem ? (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                {tabs}
            </TabBar>
        ) : (
            <div>{children}</div>
        );
    }
}

export default withRouter(App);
