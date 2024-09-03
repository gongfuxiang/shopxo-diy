import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/layout/index.vue';

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index.vue'),
            },
        ],
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'homepage', affix: true },
            },
        ],
    },
];
/**
 * 创建路由
 */
const router = createRouter({
    // createWebHashHistory  Hash模式
    // createWebHashHistory  history模式
    history: createWebHashHistory(),
    routes: constantRoutes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 }),
});
/**
 * 重置路由
 */
export function resetRouter() {
    router.replace({ path: '/dashboard' });
}
// 重定向到首页的守卫
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        //如果未匹配到路由
        from.name ? next({ name: from.name }) : next({ path: '/' });
    } else {
        next();
    }
});

export default router;
