import { createApp } from 'vue';
import { setupStore } from '@/store';

import App from './App.vue';
import router from './router';
import Particles from 'vue3-particles';

import common from '@/utils/common';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
//default styles
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import '@/styles/index.scss';
const app = createApp(App);

// 将common设置为全局
app.config.globalProperties.$common = common;

app.use(router);
app.use(Particles);
app.use(Vue3DraggableResizable);
app.use(ElementPlus, {
    locale: zhCn,
});
// 全局注册 状态管理(store)
setupStore(app);

app.mount('#app');
