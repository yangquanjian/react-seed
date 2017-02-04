# 开发指南

## 环境

  1. npm install 安装所有依赖
  2. npm run dev 恩，就可以开发了

## 以开发一个理财产品列表页面为例

### 1. 接口 && mockup文件

首先前后端定好接口, 并添加到[接口文档](./api.md)中:

    * URL: /api/product/list
    * METHOD: GET
    * PARAMS:
        > categoryId // 产品分类
        > token
    * RESPONSE: 

  ```
{
    "status": 0,
    "message": {
        "global": "获取产品列表失败"
    },
    "data": [
        {
            "id": "1",
            "title": "产品名称",
            "description": "产品描述",
            ...
        },
        ...
    ]
}
  ```

根据接口url在mock中新建目录mockup/product,并新建文件list.js,根据接口创建一些假数据，供本地开发使用:

参考[mockup/product/list.js](../mockup/product/list.js)

mockup文件建好后，即可通过 http://localhost:8080/api/product/list 访问到该文件

同时将该接口添加到[src/api/index.js](../src/api/index.js)中

```
import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {
  /**
   * 获取产品列表
   */
  getProductList: () => api.get('/product/list'),
};
```

### 2. 添加view组件 

一个view组件对应一个页面入口，因产品列表是产品tab上的首页，在../src/views/product/ 下新建一个Home的view文件，主要代码：

```
import React, { PureComponent } from 'react';
import ProductList from '../../components/product/List';

export default class ProductHome extends PureComponent {
  render() {
    return (
      <div>
        <h1>产品首页</h1>
        <ProductList {...this.props} />
      </div>
    );
  }
}
```

从上面代码，我们看到view组件是一个容器组件，主要用于组织其他子组件（ProductList等）,view组件还要一个重要任务是连接redux，向子组件传递所有必要的属性(props),这个后面讲到。

别忘了将view组件添加到路由配置中：

```
import ProductHome from '../views/product/Home';

  <Router
    history={history}
    ...
  >
    <Route path="/" component={Frame}>
      ...,
      <Route path="product" components={ProductHome} />
      ...
    </Route>
  </Router>

```

### 3. 添加子组件

通过需求分析，我们定义ProductList组件，用于展示产品列表页面，子组件路径：src/components/product/List.js

ProductList关键代码片段:

```
import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { prepareDataSource } from '../../utils/listView';
import ListItem from './ListItem';
import './list.less';

export default class ProductList extends PureComponent {

  static propTypes = {
    list: ImmutablePropTypes.list.isRequired,
    getList: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    push: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      this.setState({
        dataSource: prepareDataSource(list),
        isLoading: false,
      });
    }
  }

  @autobind
  onEndReached() {
    const { isLoading } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true }, this.getList);
    }
  }

  /**
   * 根据产品分类id获取产品列表
   */
  @autobind
  getList() {
    const { categoryId, getList } = this.props;
    getList(categoryId);
  }

  renderHeader() {
    return (
      <span>Header</span>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <ListItem
        key={`${sectionID}-${rowID}`}
        {...rowData}
      />
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        className="list-separator"
      />
    );
  }

  @autobind
  renderFooter() {
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading ? '加载中...' : '加载完毕' }
      </div>
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        className="list-over-tabbar product-list"
        dataSource={dataSource}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
```

这里主要注意以下几点：
  1. 组件尽可能拆分成较细粒度，这里我们将List每一行的渲染单独拆成一个ListItem的组件，ListItem的代码不贴了，可参考[这里](../src/components/product/ListItem.js)；
  2. PropTypes必须要声明，这个可以增强代码可读性以及可维护性；
  3. props全部从父组件中获取；
  4. 样式文件（list.less）直接在js中引入，webpack中的css-loader会自动处理;

我们知道，ProductList组件最终会被view组件(views/product/Home.js)引用，作为页面的一部分，同时，ProductList组件应向view组件提供一份配置，比如如何获取list数据,页面上该组件有哪些交互等，以便view组件将合适的props传递给ProductList组件。

上述组件配置文件就是ListRedux文件，ListRedux主要代码：

```
import { fromJS } from 'immutable';
import { createReducer, createTypes } from 'reduxsauce';
import createAction, { createRequestActions } from '../../utils/createAction';
import { createRequestConstants } from '../../utils/createConstants';

/**
 * constants
 */
export const constants = createTypes(`
  GET_PRODUCT_LIST
`);

/**
 * actions
 */
// 获取理财产品列表
const getProductList =
  categoryId => createAction(constants.GET_PRODUCT_LIST, { categoryId });

// 获取理财产品列表这个异步过程用到的辅助action
const productListConstants = createRequestConstants(constants.GET_PRODUCT_LIST);
const productList = createRequestActions(productListConstants);

export const actions = { getProductList, productList };

/**
 * reducers
 */
const INITIAL_STATE = fromJS({
  items: [],
});

const updateList = (state, action) => {
  const { response } = action;
  return state.update('items', list => list.concat(response.data));
};

const ACTION_HANDLERS = {
  [productListConstants.SUCCESS]: updateList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
```

上述代码中，主要包括三种类型的数据(export出去的对象)：

  * constants: 在saga中用到，用于监听异步action请求
  * actions: 请求数据用到的action函数getProductList, 以及处理异步过程的productList: { request, success, failure }
  * reducer: 接收redux派发出来的action，并改变store数据

从上面代码中，我们定义了getProductList来获取列表数据，但是getProductList只是一个action，并没有真的发起ajax请求和后端交互，这个工作是由`redux-saga`来完成的，`redex-saga`通过监听getProductList函数dispatch出来的action，发起ajax请求，获取数据后再dispatch`productList.SUCCESS` action通知 reducer来更新列表数据(updateList),从而触发组件渲染。

### 4. 创建saga处理异步请求

在src/sagas中新建productSaga.js,用于处理所有理财产品相关的异步请求：

```
import { take, call, fork } from 'redux-saga/effects';
import { actions as homeActions, constants as homeConstants } from '../views/product/HomeRedux';
import { createFetchGenerator } from '../utils/createSagas';

export default (api) => {
  // 获取客户详情
  const getProductList = createFetchGenerator(homeActions.list.productList, api.getProductList);

  function* watchGetProductList() {
    while (true) { // eslint-disable-line
      const { categoryId } = yield take(homeConstants.list.GET_PRODUCT_LIST);
      yield call(getProductList, { categoryId });
    }
  }

  function* watcher() {
    yield fork(watchGetProductList);
  }

  return watcher;
};
```

其中，`createFetchGenerator`是一个通用的生成异步获取数据函数的函数， 具体参考[utils/createSagas](../src/utils/createSagas.js)

并将此saga添加到sagas/index.js中以便在应用启动时生效：

```
import productSaga from './productSaga';
import api from '../api';

export default function* root() {
  ...,
  yield fork(productSaga(api));
}
```

### 5. view组件连接redux

在views/product/Home.js所在目录下新建HomeRedux.js用于连接redux,HomeRedux同时需import 子组件ProductList的redux配置，具体代码：

```
import { combineReducers } from 'redux-immutable';

// 引入 reducer / actionCreator / constant
import list, { actions as listActions, constants as listConstants } from '../../components/product/ListRedux';

export default combineReducers({
  list,
});

export const actions = {
  list: listActions,
};

export const constants = {
  list: listConstants,
};
```

因这里只用到了ProductList组件，所以只需引入product/ListRedux配置，如果有多个子组件，则需引入所有子组件的redux文件(如果有的话)，另外要注意将HomeRedux中创建的reducer添加到src/redux/reducers中

```
import productHome from '../views/product/HomeRedux';

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...,
    productHome,
    ...,
  });
}

```

最后，我们再回到views/product/Home.js，添加连接redux的相关代码：

```
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { actions } from './HomeRedux';
import ProductList from '../../components/product/List';

const mapStateToProps = state => ({
  list: state.getIn(['productHome', 'list', 'items']),
});

const mapDispatchToProps = {
  getList: actions.list.getProductList,
  push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  render() {
    return (
      <div>
        <h1>产品首页</h1>
        <ProductList
          categoryId={'c12'}
          {...this.props}
        />
      </div>
    );
  }
}
```

我们通过redux connect获取到list、getList等props（均在ListRedux中定义）,并传递给ProductList，至此一个简单的理财产品列表就完成了。



