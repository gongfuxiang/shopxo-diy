import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/layout/index.vue";

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/redirect",
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index.vue"),
            },
        ],
    },
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                name: "Dashboard",
                meta: { title: "dashboard", icon: "homepage", affix: true },
            },
            {
                path: "401",
                component: () => import("@/views/error-page/401.vue"),
                meta: { hidden: true },
            },
            {
                path: "404",
                component: () => import("@/views/error-page/404.vue"),
                meta: { hidden: true },
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
    router.replace({ path: "/login" });
}

export default router;
