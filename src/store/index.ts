import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

// 全局注册 store
export function setupStore(app: App<Element>) {
    app.use(store);
}
export * from './modules/footer-nav-content';
export * from './modules/upload';
export * from './modules/shop';
export * from './modules/custom';
export * from './modules/common';
export { store };
