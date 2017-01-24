/**
 * @file routes.js
 *  路由配置
 * @author maoquan(maoquan@htsc.com)
 */
import { NotFoundPage } from './containers/NotFoundPage';
import tabConfig from './config/tabConfig';
import MessageList from './containers/Message/List';

export default function createRoutes(store) { // eslint-disable-line
  return tabConfig.map(
    item => ({
      path: `/${item.key}`,
      component: item.component,
    }),
  ).concat([
    {
      path: '/message',
      component: MessageList,
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFoundPage,
    },
  ]);
}
