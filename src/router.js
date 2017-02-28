/**
 * @file routes.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import {
  applyRouterMiddleware,
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from 'dva/router';
import { useScroll } from 'react-router-scroll';

import Frame from './layouts/Frame';
import TabPane from './layouts/TabPane';

import ProductHome from './views/product/Home';
import ProductDetail from './views/product/Detail';
import CustomerHome from './views/customer/Home';
import CustomerDetail from './views/customer/Detail';
import CustBasic from './views/customer/CustBasic';
import CustContactPer from './views/customer/CustContactPer';
import CustContactOrg from './views/customer/CustContactOrg';
import ContactOrgDetail from './views/customer/ContactOrgDetail';
import ServiceList from './views/customer/ServiceList';
import CustomerSearchResult from './views/customer/SearchResult';
import MissionHome from './views/mission/Home';
import MissionDetail from './views/mission/Detail';
import Profile from './views/profile';


const routes = ({ history }) => (// eslint-disable-line
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
      <Route path="product" components={TabPane}>
        <IndexRoute component={ProductHome} />
        <Route path="detail" components={ProductDetail} />
      </Route>
      <Route path="customer" component={TabPane}>
        <IndexRoute component={CustomerHome} />
        <Route path="searchResult" component={CustomerSearchResult} />
        <Route path=":id" component={CustomerDetail} />
        <Route path="/custBasic/:custNumber/:custSor/:custId" component={CustBasic} />
        <Route path="/custContactPer/:custNumber/:custSor/:custId" component={CustContactPer} />
        <Route path="/custContactOrg/:custNumber/:custSor/:custId" component={CustContactOrg} />
        <Route path="/ContactOrgDetail" component={ContactOrgDetail} />
        <Route path="/serviceList/:custNumber" component={ServiceList} />
      </Route>
      <Route path="profile" components={Profile} />
    </Route>
  </Router>
);

export default routes;
