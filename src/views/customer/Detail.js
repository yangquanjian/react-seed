/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CustomerDetailHeader from '../../components/customer/DetailHeader';
import ChartWidget from '../../components/customer/Chart';

const mapStateToProps = state => ({
    data: state.customer.get('detailInfo'),
    chartData: state.customer.get('chartInfo')
});

const mapDispatchToProps = {
    getBasicInfo: custId => ({
        type: 'customer/getBasicInfo',
        payload: { custId },
    }),
    push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerDetail extends PureComponent {
    static propTypes = {
        data: ImmutablePropTypes.map,
        // chartData: ImmutablePropTypes.array,
    }

    static defaultProps = {
        data: undefined,
        // chartData: undefined
    };

    componentDidMount() {

    }

    render() {
        const { data, ...others} = this.props;
        return (
            <div>
                <p>客户详细信息</p>
                <CustomerDetailHeader
                    data={data}
                />
                <ChartWidget {...others} />
            </div>
        );
    }


// import CustomerForm from '../../components/customer/Form';

// const mapStateToProps = state => ({
//   data: state.customer.get('data'),
// });

// const mapDispatchToProps = {
//   saveData: data => ({
//     type: 'customer/save',
//     payload: data,
//   }),
//   push: routerRedux.push,
// };

// @connect(mapStateToProps, mapDispatchToProps)
// export default class CustomDetail extends Component {
//   static propTypes = {
//     data: ImmutablePropTypes.map.isRequired,
//     params: PropTypes.object.isRequired,
//   }

//   render() {
//     const { params, ...others } = this.props;
//     return (
//       <div>
//         <h1>修改客户信息</h1>
//         <CustomerForm
//           {...others}
//           id={params.id}
//         />
//       </div>
//     );
//   }

}
