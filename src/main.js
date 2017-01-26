/**
 * @file app.js
 * @author maoquan
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
// Import CSS reset and Global Styles
import 'sanitize.css/sanitize.css';

import ProductList from './containers/product/List';
import CustomerList from './containers/customer/List';
import TabPane from './containers/app/TabPane';
import MissionHome from './containers/mission/Home';
import MissionDetail from './containers/mission/Detail';
import Profile from './containers/profile';

// https://github.com/amfe/lib-flexible
import '../dep/flexible/flexible-0.3.2';
import './css/main.less';

import configureStore from './store';
import App from './containers/app';
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={
        // Scroll to top when going to a new page, imitating default browser
        // behaviour
        applyRouterMiddleware(useScroll())
      }
    >
      <Route path="/" component={App}>
        <IndexRedirect to="/mission" />
        <Route path="mission" component={TabPane}>
          <IndexRoute component={MissionHome} />
          <Route path=":id" component={MissionDetail} />
        </Route>
        <Route path="product" components={ProductList} />
        <Route path="customer" components={CustomerList} />
        <Route path="profile" components={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
