import { get_type } from '@/utils/common';
import request from '@/utils/request';
import index_request from '@/utils/index-request';
import { isEmpty } from 'lodash';

class CommonAPI {
    /**  链接初始化接口 */
    static getInit() {
        const new_type = get_type();
        const location_host = document.location.host; 
        if (isEmpty(new_type) || location_host.indexOf('#/tabbar') !== -1) {
            return request({
                url: `diyapi/init`,
                method: 'post',
            });
        } else {
            return index_request({
                url: `?s=plugins/index/pluginsname/${ new_type }/pluginscontrol/diyapi/pluginsaction/init.html`,
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