/**
 * @file routes.js
 *  路由配置
 * @author yankun01
 */
import { NotFoundPage } from './containers/NotFoundPage';
import PlanList from './containers/Plan/PlanList';

export default function createRoutes(store) {
    return [
        {
            path: '/planList',
            component: PlanList
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFoundPage
        },
    ];
}
