import { get_type } from '@/utils/common';
import request from '@/utils/request';
import api_request from '@/utils/api-request';
import { isEmpty } from 'lodash';

class CommonAPI {
    /**  链接初始化接口 */
    static getInit() {
        if (get_type() == 'shop') {
            return api_request({
                url: `?s=plugins/index/pluginsname/shop/pluginscontrol/diyapi/pluginsaction/init.html`,
                method: 'post',
            });
        } else {
            return request({
                url: `diyapi/init`,
                method: 'post',
            });
        }
        
    }
    /**  动态接口 */
    static getDynamicApi(url: string, data: any, is_header: boolean = false) {
        if (!isEmpty(url)) {
            return request({
                url: url,
                method: 'post',
                ...(is_header ? { data: data } : { data }),
                ...(is_header ? { headers: {
                    'Content-Type': 'multipart/form-data',
                }}: {}),
            });
        }
        return Promise.reject('接口不存在');
    }
}

export default CommonAPI;