/**
 * @file routes.js
 *  路由配置
 * @author maoquan(maoquan@htsc.com)
 */
import { NotFoundPage } from './containers/error';
import tabConfig from './config/tabConfig';

export default function createRoutes(store) { // eslint-disable-line
  return tabConfig.map(
    item => ({
      path: `/${item.key}`,
      component: item.component,
    }),
  ).concat([
    {
      path: '*',
      name: 'notfound',
      component: NotFoundPage,
    },
  ]);
}
