/**
 * @file routes.js
 *  路由配置
 * @author yankun01
 */
import { NotFoundPage } from './containers/NotFoundPage';
import tabConfig from './config/tabConfig'
import MessageList from './containers/Message/List';

export default function createRoutes(store) {
    return tabConfig.map(
        item => {
            return {
                path: '/' + item.key,
                component: item.component
            }
        }
    ).concat([
        {
            path: '/message',
            component: MessageList
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFoundPage
        },
    ]);
}
