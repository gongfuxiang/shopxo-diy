import request from '@/utils/request';

class CommonAPI {
    /**  链接初始化接口 */
    static getInit() {
        return request({
            url: `diyapi/init`,
            method: 'post',
        });
    }
}

export default CommonAPI;
