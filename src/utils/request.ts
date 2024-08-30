import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { get_cookie } from './index';
// 创建 axios 实例
const index = window.location.href.lastIndexOf('?s=');
const pro_url = window.location.href.substring(0, index);
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API == '/dev-api' ? import.meta.env.VITE_APP_BASE_API : pro_url + '?s=',
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
/** @ts-ignore  */
// 请求拦截器
service.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // 如果是本地则使用静态tonken如果是线上则使用cookie的token
        const cookie = get_cookie('admin_info');
        if (import.meta.env.VITE_APP_BASE_API == '/dev-api') {
            let temp_data = await import(import.meta.env.VITE_APP_BASE_API == '/dev-api' ? '../../temp.d' : '../../temp_pro.d');
            config.url = config.url + '?token=' + temp_data.default.temp_token;
        } else {
            if (cookie) {
                config.url = config.url + '&token=' + JSON.parse(cookie).token;
            }
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
        const { code, msg, message, data } = response.data;
        if (code == 0) {
            return response.data;
        } else if (code == -400) {
            ElMessageBox.alert(msg, '温馨提示', {
                confirmButtonText: '确定',
                showClose: false,
                type: 'warning',
            }).then(() => {
                localStorage.clear(); // @vueuse/core 自动导入
                window.location.href = data;
            });
        } else {
            ElMessage.error(msg || message || '系统出错');
            return Promise.reject(new Error(msg || 'Error'));
        }
    },
    (error: any) => {
        if (error.response.data) {
            const { msg, message } = error.response.data;
            ElMessage.error(msg || message || '系统出错');
        }
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;
