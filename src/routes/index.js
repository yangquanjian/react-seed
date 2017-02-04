/**
 * @file routes/index.js
 * @author maoquan(maoquan@htsc.com)
 */


import React from 'react';
import { applyRouterMiddleware, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { useScroll } from 'react-router-scroll';

import Frame from '../layouts/Frame';
import TabPane from '../layouts/TabPane';

import ProductHome from '../views/product/Home';
import CustomerHome from '../views/customer/Home';
import CustomerDetail from '../views/customer/Detail';
import MissionHome from '../views/mission/Home';
import MissionDetail from '../views/mission/Detail';
import Profile from '../views/profile';


const routes = history => (
  <Router
    history={history}
    render={
      // Scroll to top when going to a new page, imitating default browser behaviour
      applyRouterMiddleware(useScroll())
    }
  >
    <Route path="/" component={Frame}>
      <IndexRedirect to="/mission" />
      <Route path="mission" component={TabPane}>
        <IndexRoute component={MissionHome} />
        <Route path=":id" component={MissionDetail} />
      </Route>
      <Route path="product" components={ProductHome} />
      <Route path="customer" component={TabPane}>
        <IndexRoute component={CustomerHome} />
        <Route path=":id" component={CustomerDetail} />
      </Route>
      <Route path="profile" components={Profile} />
    </Route>
  </Router>
);

export default routes;
