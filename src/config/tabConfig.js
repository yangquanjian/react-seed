import ProductList from '../containers/product/List';
import CustomerList from '../containers/customer/List';
import Mission from '../containers/mission';
import Profile from '../containers/profile';

const tabConfig = [
  {
    key: 'mission',
    label: '任务',
    component: Mission,
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
    key: 'mine',
    label: '我的',
    component: Profile,
  },
];

export default tabConfig;
