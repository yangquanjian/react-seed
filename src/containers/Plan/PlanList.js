/**
 * @file Base/BaseList.js
 * @author yankun01
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import BaseList from '../Base/BaseList'
import {Table, Icon} from 'antd'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="#">Action 一 {record.name}</a>
                <span className="ant-divider" />
                <a href="#">Delete</a>
                <span className="ant-divider" />
                <a href="#" className="ant-dropdown-link">
                    More actions <Icon type="down" />
                </a>
            </span>
        ),
    }
]

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }
]

class PlanList extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {

    }

    static entityName = 'plan'

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let list = state.get('list').toJS();
    return {
        entityName: PlanList.entityName,
        listData: list.listData[PlanList.entityName]
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default BaseList(mapStateToProps, mapDispatchToProps)(PlanList)
