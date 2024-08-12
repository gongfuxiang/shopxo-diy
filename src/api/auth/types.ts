/**
 * 登录请求参数
 */
export interface LoginData {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;

    /**
     * 验证码缓存key
     */
    // verifyCodeKey?: string;

    /**
     * 验证码
     */
    // verifyCode?: string;
}
