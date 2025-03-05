import { createApp } from 'vue';
import { setupStore } from '@/store';

import App from './App.vue';
import router from './router';
import Particles from 'vue3-particles';

import popUp from '@/utils/popUp';
//default styles
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

import '@/styles/index.scss';
import 'swiper/css';
const app = createApp(App);

// 将popUp设置为全局
app.config.globalProperties.$common = popUp;
app.directive('focus', {
    mounted(el) {
        el.querySelector('input').focus();
    },
});
app.use(router);
app.use(Particles);
app.use(Vue3DraggableResizable);
// 全局注册 状态管理(store)
setupStore(app);

app.mount('#app');
