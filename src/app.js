/**
 * @file app.js
 * @author maoquan
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// Import CSS reset and Global Styles
import 'sanitize.css/sanitize.css';
// https://github.com/amfe/lib-flexible
import '../dep/flexible/flexible-0.3.2';

import configureStore from './redux/store';
import routes from './routes';

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
    const routingState = state.get('route');

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
    { routes(history) }
  </Provider>,
  document.getElementById('app'),
);
