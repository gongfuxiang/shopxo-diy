import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox, type MessageHandler } from 'element-plus';
import { get_cookie } from './index';

// 提示拦截

let messageInstance: MessageHandler;
const message_error = (info: string) => {
    if (messageInstance) {
        messageInstance.close();
    }
    messageInstance = ElMessage.error({
        type: 'error',
        message: info,
        duration: 30000,
        showClose: true,
    });
};

// 创建一个状态变量来跟踪是否已经弹出了退出登录的弹窗
const isLogoutModalShown = ref(true);

// 用于存储每个请求的CancelToken
const pendingRequests = new Map();
// 不需要认证的接口
const release_url = ['diyapi/attachmentupload'];
// 创建 axios 实例
const index = window.location.href.lastIndexOf('?s=');
const new_data = window.location.href.substring(0, index);
const new_index = new_data.lastIndexOf('/');
const pro_url = window.location.href.substring(0, new_index);
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_PHP == '/dev-php' ? import.meta.env.VITE_APP_BASE_API_PHP : pro_url + '/api.php',
    timeout: 60000,
    headers: { 'Content-Type': 'application/json;charset=utf-8', 'X-Requested-With': 'XMLHttpRequest' },
});
/** @ts-ignore  */
// 请求拦截器
service.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // 如果是本地则使用静态tonken如果是线上则使用cookie的token
        const cookie = get_cookie('admin_info') || '';
        const symbol = config.url?.includes('?') ? '&' : '?';
        if (import.meta.env.VITE_APP_BASE_API_PHP == '/dev-php') {
            let temp_data = await import(import.meta.env.VITE_APP_BASE_API_PHP == '/dev-php' ? '../../temp.d' : '../../temp_pro.d');
            config.url = config.url + symbol + 'token=' + temp_data.default.temp_token;
        } else {
            if (cookie && cookie !== null && cookie !== 'null') {
                config.url = config.url + '&token=' + (JSON.parse(cookie) !== 'null' ? JSON.parse(cookie)?.token : '');
            }
        }
        // 判断是否是包含不需要认证的接口
        const release_list = release_url.filter(item => config.url?.includes(item));
        if (release_list.length === 0) {
            // 检查是否有相同请求正在进行，如果有则取消, 防止重复请求导致返回数据有误
            if (pendingRequests.has(config.url)) {
                const cancelToken = pendingRequests.get(config.url);
                cancelToken.cancel('canceled');
                pendingRequests.delete(config.url);
            }
            // 创建一个新的 CancelToken
            const source = axios.CancelToken.source();
            config.cancelToken = source.token;
            pendingRequests.set(config.url, source);
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 请求完成后，从pendingRequests中移除
        pendingRequests.delete(response.config.url);

        const { code, msg, message, data } = response.data;
        if (code == 0) {
            return response.data;
        } else if (code == -400) {
            if (isLogoutModalShown.value) {
                isLogoutModalShown.value = false;
                ElMessageBox.alert(msg, '温馨提示', {
                    confirmButtonText: '确定',
                    showClose: false,
                    type: 'warning',
                }).then(() => {
                    localStorage.clear(); // @vueuse/core 自动导入
                    window.location.href = data.logout;
                });
            }
        } else {
            message_error(msg || message || '系统出错');
            return Promise.reject('Error');
            // return Promise.reject(new Error(msg || 'Error'));
        }
    },
    (error: any) => {
        if (error.response && error.response.data) {
            const { msg, message } = error.response.data;
            message_error(msg || message || '系统出错');
        } else if (error.message == 'canceled') {
            console.log('请求已取消');
        } else {
            message_error(error.message);
        }

        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;
