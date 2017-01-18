import React, { Component, PropTypes } from 'react'
import { TabBar } from 'antd-mobile';
import { Link } from 'react-router';

export default class MyTabBar extends Component {

    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'zhifubao'
        }
    }

    renderContent(content) {
        return <Link to="/product">产品列表</Link>
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    key="zhifubao"
                    title="生活"
                    icon={require('./images/zhifubao.png')}
                    selectedIcon={require('./images/zhifubao_sel.png')}
                    selected={this.state.selectedTab === 'zhifubao'}
                    badge={1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'zhifubao',
                        });
                    }}
                >
                    {this.renderContent('生活')}
                </TabBar.Item>

                <TabBar.Item
                    key="koubei"
                    title="口碑"
                    icon={require('./images/koubei.png')}
                    selectedIcon={require('./images/koubei_sel.png')}
                    selected={this.state.selectedTab === 'koubei'}
                    badge={2}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'koubei',
                        });
                    }}
                >
                    {this.renderContent('口碑')}
                </TabBar.Item>

                <TabBar.Item
                    key="friend"
                    title="朋友"
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    selected={this.state.selectedTab === 'friend'}
                    badge={1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'friend',
                        });
                    }}
                >
                    {this.renderContent('朋友')}
                </TabBar.Item>

                <TabBar.Item
                    key="money"
                    title="财富"
                    icon={require('./images/money.png')}
                    selectedIcon={require('./images/money_sel.png')}
                    selected={this.state.selectedTab === 'money'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'money',
                        });
                    }}
                >
                    {this.renderContent('财富')}
                </TabBar.Item>
            </TabBar>
        )
    }
}
