import ProductList from '../containers/Product/List';
import CustomerList from '../containers/Customer/List';
import ReportList from '../containers/Report/List';
import Home from '../containers/Home';

const tabConfig = [
  {
    key: 'home',
    label: '首页',
    component: Home,
  },
  {
    key: 'product',
    label: '产品',
    component: ProductList,
  },
  {
    key: 'customer',
    label: '客户',
    component: CustomerList,
  },
  {
    key: 'report',
    label: '报表',
    component: ReportList,
  },
];

export default tabConfig;
