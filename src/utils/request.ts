import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { get_cookie } from './index';
// 创建 axios 实例
const index = window.location.href.lastIndexOf('?');
const pro_url = window.location.href.substring(0, index);
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API == '/dev-api' ? import.meta.env.VITE_APP_BASE_API : pro_url,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 如果是本地则使用静态tonken如果是线上则使用cookie的token
        const cookie = get_cookie('admin_info');
        let token_key = '';
        if (cookie) {
            token_key = import.meta.env.VITE_APP_BASE_API == '/dev-api' ? '68f4eba5f67a758a972cca831885dfda' : JSON.parse(cookie);
        }
        if (token_key) {
            config.url = config.url + '?token=' + token_key;
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
        const { code, msg } = response.data;
        // 登录成功
        if (code == '0') {
            return response.data;
        }

        ElMessage.error(msg || '系统出错');
        return Promise.reject(new Error(msg || 'Error'));
    },
    (error: any) => {
        if (error.response.data) {
            const { code, msg } = error.response.data;
            // token 过期，跳转登录页
            if (code === '-400') {
                ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                }).then(() => {
                    localStorage.clear(); // @vueuse/core 自动导入
                    window.location.href = '/';
                });
            } else {
                ElMessage.error(msg || '系统出错');
            }
        }
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;
