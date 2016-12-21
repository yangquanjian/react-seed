/**
 * @file routes.js
 *  路由配置
 * @author yankun01
 */
import { NotFoundPage } from './containers/NotFoundPage';

export default function createRoutes(store) {
    return [
        {
            path: '*',
            name: 'notfound',
            component: NotFoundPage
        },
    ];
}
